import { NextRequest, NextResponse } from "next/server";

import {
  createPhonePePayment,
  generateMerchantOrderId,
} from "@/lib/phonepe";

import { getTicket } from "@/lib/tickets";

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

    const totalAmount =
      ticket.price * quantity;

    const amountInPaise =
      totalAmount * 100;

    const merchantOrderId =
      generateMerchantOrderId();

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
      });

    const redirectUrl =
      phonePeResponse?.redirectUrl ||
      phonePeResponse?.data?.redirectUrl;

    if (!redirectUrl) {
      console.error(
        "PhonePe response:",
        phonePeResponse
      );

      throw new Error(
        "PhonePe did not return a checkout URL."
      );
    }

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