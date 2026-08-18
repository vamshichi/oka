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

export async function POST(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Read request body
    // ---------------------------------------------

    let body: CreatePaymentRequest;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment request.",
        },
        { status: 400 }
      );
    }

    const {
      ticketType,
      fullName,
      email,
      mobile,
      quantity,
    } = body;

    // ---------------------------------------------
    // 2. Validate required fields
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
    // 3. Validate quantity
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
    // 4. Validate mobile
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
    // 5. Validate email
    // ---------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 6. Get ticket from SERVER
    // ---------------------------------------------

    const ticket = getTicket(ticketType);

    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid ticket type.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 7. Calculate amount SERVER-SIDE
    // ---------------------------------------------

    const totalAmount =
      ticket.price * quantity;

    const amountInPaise =
      totalAmount * 100;

    // ---------------------------------------------
    // 8. Generate merchant order ID
    // ---------------------------------------------

    const merchantOrderId =
      generateMerchantOrderId();

    // ---------------------------------------------
    // 9. CREATE MONGODB ORDER
    // ---------------------------------------------

    try {
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
        merchantOrderId
      );
    } catch (databaseError) {
      console.error(
        "MongoDB order creation failed:",
        databaseError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create payment order. Please try again.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------
    // 10. CREATE PHONEPE PAYMENT
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
      console.error(
        "PhonePe payment creation failed:",
        phonePeError
      );

      // Mark database order as failed
      try {
        await prisma.paymentOrder.update({
          where: {
            merchantOrderId,
          },

          data: {
            paymentStatus: "FAILED",
          },
        });
      } catch (databaseError) {
        console.error(
          "Failed to update payment order:",
          databaseError
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            phonePeError instanceof Error
              ? phonePeError.message
              : "Unable to create PhonePe payment.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------
    // 11. Get PhonePe redirect URL
    // ---------------------------------------------

    const redirectUrl =
      phonePeResponse?.redirectUrl ||
      phonePeResponse?.data?.redirectUrl;

    if (!redirectUrl) {
      console.error(
        "PhonePe response:",
        phonePeResponse
      );

      try {
        await prisma.paymentOrder.update({
          where: {
            merchantOrderId,
          },

          data: {
            paymentStatus: "FAILED",
          },
        });
      } catch (databaseError) {
        console.error(
          "Failed to mark order failed:",
          databaseError
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "PhonePe did not return a checkout URL.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------
    // 12. SUCCESS
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
      "Create payment error:",
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
      { status: 500 }
    );
  }
}