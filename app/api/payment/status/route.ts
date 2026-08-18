import { NextRequest, NextResponse } from "next/server";

import {
  getPhonePeOrderStatus,
} from "@/lib/phonepe";

import {
  sendPaymentConfirmationEmail,
} from "@/lib/email";

import { getTicket } from "@/lib/tickets";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const merchantOrderId =
      searchParams.get("orderId");

    if (!merchantOrderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required.",
        },
        { status: 400 }
      );
    }

    if (
      !/^OAK_[0-9]+_[a-f0-9]+$/i.test(
        merchantOrderId
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order ID.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // Verify payment with PhonePe
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

    // ---------------------------------------------
    // PAYMENT SUCCESS
    // ---------------------------------------------

    if (state === "COMPLETED") {
      const metaInfo =
        phonePeResponse?.metaInfo ||
        phonePeResponse?.data?.metaInfo;

      console.log(
        "PhonePe metaInfo:",
        metaInfo
      );

      const customerName =
        metaInfo?.udf1;

      const customerEmail =
        metaInfo?.udf2;

      const mobile =
        metaInfo?.udf3;

      const ticketType =
        metaInfo?.udf4;

      const quantity = Number(
        metaInfo?.udf5 || 1
      );

      // ---------------------------------------------
      // Get ticket from SERVER
      // ---------------------------------------------

      const ticket = ticketType
        ? getTicket(ticketType)
        : null;

      // ---------------------------------------------
      // PhonePe amount is paise
      // ---------------------------------------------

      const amountInPaise =
        phonePeResponse?.amount ||
        phonePeResponse?.data?.amount ||
        0;

      const amountInRupees =
        amountInPaise / 100;

      const phonePeOrderId =
        phonePeResponse?.orderId ||
        phonePeResponse?.data?.orderId ||
        merchantOrderId;

      // ---------------------------------------------
      // SEND EMAIL
      // ---------------------------------------------

      if (
        customerName &&
        customerEmail &&
        mobile &&
        ticketType &&
        ticket
      ) {
        try {
          await sendPaymentConfirmationEmail({
            customerName,

            customerEmail,

            mobile,

            ticketName: ticket.name,

            ticketType,

            quantity,

            amount: amountInRupees,

            merchantOrderId,

            phonePeOrderId,
          });

          console.log(
            "✅ Payment emails sent successfully."
          );
        } catch (emailError) {
          console.error(
            "❌ Payment successful but email failed:",
            emailError
          );
        }
      } else {
        console.error(
          "❌ Missing payment customer information:",
          {
            customerName,
            customerEmail,
            mobile,
            ticketType,
            quantity,
            hasTicket: Boolean(ticket),
          }
        );
      }

      return NextResponse.json({
        success: true,

        paymentStatus: "SUCCESS",

        orderId: merchantOrderId,

        phonePeOrderId,

        amount: amountInPaise,

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