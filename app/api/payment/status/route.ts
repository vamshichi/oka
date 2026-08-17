import { NextRequest, NextResponse } from "next/server";

import {
  getPhonePeOrderStatus,
} from "@/lib/phonepe";

import {
  sendPaymentConfirmationEmail,
} from "@/lib/email";

import {
  verifyPaymentOrderToken,
} from "@/lib/payment-order";

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const merchantOrderId =
      searchParams.get("orderId");

    const token =
      searchParams.get("token");

    // ---------------------------------------------
    // Validate order ID
    // ---------------------------------------------

    if (!merchantOrderId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Validate token
    // ---------------------------------------------

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification token is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Verify signed order data
    // ---------------------------------------------

    const order =
      verifyPaymentOrderToken(token);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment verification token.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Make sure token belongs to this order
    // ---------------------------------------------

    if (
      order.merchantOrderId !==
      merchantOrderId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Ask PhonePe for REAL payment status
    // ---------------------------------------------

    const phonePeResponse =
      await getPhonePeOrderStatus(
        merchantOrderId
      );

    console.log(
      "PhonePe order status:",
      phonePeResponse
    );

    const state =
      phonePeResponse?.state ||
      phonePeResponse?.data?.state;

    const phonePeOrderId =
      phonePeResponse?.orderId ||
      phonePeResponse?.data?.orderId ||
      merchantOrderId;

    // ---------------------------------------------
    // PAYMENT SUCCESS
    // ---------------------------------------------

    if (state === "COMPLETED") {
      /*
       * IMPORTANT:
       *
       * PhonePe has confirmed payment.
       *
       * Now send emails.
       */

      try {
        await sendPaymentConfirmationEmail({
          customerName:
            order.customerName,

          customerEmail:
            order.customerEmail,

          mobile:
            order.mobile,

          ticketName:
            order.ticketName,

          ticketType:
            order.ticketType,

          quantity:
            order.quantity,

          amount:
            order.amount,

          merchantOrderId:
            order.merchantOrderId,

          phonePeOrderId,
        });

        console.log(
          "Payment confirmation email sent successfully."
        );
      } catch (emailError) {
        /*
         * IMPORTANT:
         *
         * Payment is already successful.
         *
         * Email failure must NOT make the
         * payment appear failed.
         */

        console.error(
          "Payment successful but email failed:",
          emailError
        );
      }

      return NextResponse.json({
        success: true,

        paymentStatus: "SUCCESS",

        orderId: merchantOrderId,

        phonePeOrderId,

        customerName:
          order.customerName,

        ticketName:
          order.ticketName,

        quantity:
          order.quantity,

        amount:
          order.amount * 100,

        state,
      });
    }

    // ---------------------------------------------
    // PAYMENT FAILED
    // ---------------------------------------------

    if (state === "FAILED") {
      return NextResponse.json({
        success: true,

        paymentStatus: "FAILED",

        orderId: merchantOrderId,

        state,
      });
    }

    // ---------------------------------------------
    // PAYMENT PENDING
    // ---------------------------------------------

    return NextResponse.json({
      success: true,

      paymentStatus: "PENDING",

      orderId: merchantOrderId,

      state: state || "UNKNOWN",
    });
  } catch (error) {
    console.error(
      "Payment status error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to verify payment.",
      },
      {
        status: 500,
      }
    );
  }
}