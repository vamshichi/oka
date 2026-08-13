import { NextRequest, NextResponse } from "next/server";

import { getPhonePeOrderStatus } from "@/lib/phonepe";

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
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Validate order ID format
    // ---------------------------------------------

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
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Ask PhonePe for the REAL order status
    // ---------------------------------------------

    const phonePeResponse =
      await getPhonePeOrderStatus(
        merchantOrderId
      );

    console.log(
      "PhonePe order status:",
      phonePeResponse
    );

    // ---------------------------------------------
    // PhonePe returns the order state
    // ---------------------------------------------

    const state =
      phonePeResponse?.state ||
      phonePeResponse?.data?.state;

    /*
     * IMPORTANT
     *
     * Do NOT treat the redirect itself as success.
     *
     * Only PhonePe's server-side status determines
     * whether the payment succeeded.
     */

    if (state === "COMPLETED") {
      return NextResponse.json({
        success: true,

        paymentStatus: "SUCCESS",

        orderId: merchantOrderId,

        phonePeOrderId:
          phonePeResponse?.orderId ||
          phonePeResponse?.data?.orderId ||
          merchantOrderId,

        amount:
          phonePeResponse?.amount ||
          phonePeResponse?.data?.amount ||
          null,

        state,
      });
    }

    if (state === "FAILED") {
      return NextResponse.json({
        success: true,

        paymentStatus: "FAILED",

        orderId: merchantOrderId,

        state,
      });
    }

    // PENDING / other states
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