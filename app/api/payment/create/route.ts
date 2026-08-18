// app/api/payment/create/route.ts

import { NextRequest, NextResponse } from "next/server";

import {
  createPhonePePayment,
  generateMerchantOrderId,
} from "@/lib/phonepe";

import { getTicket } from "@/lib/tickets";

import { prisma } from "@/lib/prisma";

interface CreatePaymentRequest {
  ticketType: string;
  fullName: string;
  email: string;
  mobile: string;
  quantity: number;
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as CreatePaymentRequest;

    const {
      ticketType,
      fullName,
      email,
      mobile,
      quantity,
    } = body;

    // ---------------------------------------------
    // Validate required fields
    // ---------------------------------------------

    if (
      !ticketType ||
      !fullName ||
      !email ||
      !mobile ||
      quantity === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Validate quantity
    // ---------------------------------------------

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quantity must be between 1 and 10.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Validate mobile
    // ---------------------------------------------

    if (!/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Validate email
    // ---------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email address.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Get ticket from SERVER
    // ---------------------------------------------

    const ticket = getTicket(ticketType);

    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid ticket type.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Calculate price on SERVER
    // ---------------------------------------------

    const totalAmount =
      ticket.price * quantity;

    const amountInPaise =
      totalAmount * 100;

    // ---------------------------------------------
    // Generate unique merchant order ID
    // ---------------------------------------------

    const merchantOrderId =
      generateMerchantOrderId();

    // ---------------------------------------------
    // STEP 1:
    // Create PENDING order in MongoDB
    // ---------------------------------------------

    const order =
      await prisma.paymentOrder.create({
        data: {
          merchantOrderId,

          customerName: fullName,

          customerEmail: email,

          mobile,

          ticketType,

          ticketName: ticket.name,

          quantity,

          amount: amountInPaise,

          currency: "INR",

          paymentStatus: "PENDING",

          emailStatus: "NOT_SENT",
        },
      });

    console.log(
      "MongoDB payment order created:",
      order.id
    );

    // ---------------------------------------------
    // STEP 2:
    // Create PhonePe payment
    // ---------------------------------------------

    let phonePeResponse;

    try {
      phonePeResponse =
        await createPhonePePayment({
          merchantOrderId,

          amount: amountInPaise,

          customerName: fullName,

          email,

          mobile,

          ticketType,

          ticketName: ticket.name,

          quantity,
        });
    } catch (phonePeError) {
      // -------------------------------------------
      // PhonePe creation failed
      // Mark MongoDB order as FAILED
      // -------------------------------------------

      await prisma.paymentOrder.update({
        where: {
          merchantOrderId,
        },

        data: {
          paymentStatus: "FAILED",
        },
      });

      throw phonePeError;
    }

    // ---------------------------------------------
    // Extract PhonePe checkout URL
    // ---------------------------------------------

    const redirectUrl =
      phonePeResponse?.redirectUrl ||
      phonePeResponse?.data?.redirectUrl;

    if (!redirectUrl) {
      await prisma.paymentOrder.update({
        where: {
          merchantOrderId,
        },

        data: {
          paymentStatus: "FAILED",
        },
      });

      console.error(
        "PhonePe response:",
        phonePeResponse
      );

      throw new Error(
        "PhonePe did not return a checkout URL."
      );
    }

    // ---------------------------------------------
    // Return checkout URL
    // ---------------------------------------------

    return NextResponse.json({
      success: true,

      orderId: merchantOrderId,

      redirectUrl,

      ticket: {
        type: ticketType,

        name: ticket.name,

        quantity,
      },

      amount: {
        rupees: totalAmount,

        paise: amountInPaise,
      },
    });
  } catch (error) {
    console.error(
      "Create PhonePe payment error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create payment.",
      },
      {
        status: 500,
      }
    );
  }
}