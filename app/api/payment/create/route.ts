// app/api/payment/create/route.ts

import { NextRequest, NextResponse } from "next/server";

import {
  createPhonePePayment,
  generateMerchantOrderId,
} from "@/lib/phonepe";

import { getTicket } from "@/lib/tickets";

import {
  createPaymentOrderToken,
} from "@/lib/payment-order";

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
          message:
            "All fields are required.",
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
          message:
            "Invalid mobile number.",
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
    // Get ticket FROM SERVER
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
    // Calculate price FROM SERVER
    // ---------------------------------------------

    const totalAmount =
      ticket.price * quantity;

    const amountInPaise =
      totalAmount * 100;

    // ---------------------------------------------
    // Generate order ID
    // ---------------------------------------------

    const merchantOrderId =
      generateMerchantOrderId();

    // ---------------------------------------------
    // Create PhonePe payment
    // ---------------------------------------------

    const orderToken =
      createPaymentOrderToken({
        merchantOrderId,

        customerName: fullName,

        customerEmail: email,

        mobile,

        ticketType,

        ticketName: ticket.name,

        quantity,

        amount: totalAmount,
      });

      const redirectUrl =
  `${process.env.NEXT_PUBLIC_APP_URL}/payment/success` +
  `?orderId=${encodeURIComponent(
    merchantOrderId
  )}` +
  `&token=${encodeURIComponent(
    orderToken
  )}`;

    const phonePeResponse =
      await createPhonePePayment({
        merchantOrderId,

        amount: amountInPaise,

        customerName: fullName,

        email,

        mobile,

        ticketType,

        ticketName: ticket.name,

        quantity,
        redirectUrl,
      });

    // ---------------------------------------------
    // Extract checkout URL
    // ---------------------------------------------

    

    if (!redirectUrl) {
      console.error(
        "PhonePe response:",
        phonePeResponse
      );

      throw new Error(
        "PhonePe did not return a checkout URL."
      );
    }

    // ---------------------------------------------
    // Create signed order token
    // ---------------------------------------------

    

    return NextResponse.json({
      success: true,

      orderId: merchantOrderId,

      orderToken,

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