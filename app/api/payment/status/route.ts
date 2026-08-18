import { NextRequest, NextResponse } from "next/server";

import { getPhonePeOrderStatus } from "@/lib/phonepe";
import { prisma } from "@/lib/prisma";
import {
  sendPaymentConfirmationEmail,
} from "@/lib/email";

export async function GET(
  request: NextRequest
) {
  try {
    // ---------------------------------------------
    // 1. Get merchant order ID
    // ---------------------------------------------

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
    // 2. Validate order ID
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
    // 3. Find order in MongoDB
    // ---------------------------------------------

    const order =
      await prisma.paymentOrder.findUnique({
        where: {
          merchantOrderId,
        },
      });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order not found.",
        },
        {
          status: 404,
        }
      );
    }

    console.log(
      "MongoDB order found:",
      merchantOrderId,
      order.paymentStatus
    );

    // ---------------------------------------------
    // 4. Ask PhonePe for REAL payment status
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
    // 5. Get payment state
    // ---------------------------------------------

    const state =
      phonePeResponse?.state ||
      phonePeResponse?.data?.state;

    const phonePeOrderId =
      phonePeResponse?.orderId ||
      phonePeResponse?.data?.orderId ||
      merchantOrderId;

    const amount =
      phonePeResponse?.amount ||
      phonePeResponse?.data?.amount ||
      order.amount;

    // =============================================
    // PAYMENT SUCCESS
    // =============================================

    if (state === "COMPLETED") {
      console.log(
        "✅ PhonePe payment COMPLETED:",
        merchantOrderId
      );

      // -------------------------------------------
      // 6. Update MongoDB payment status
      // -------------------------------------------

      let updatedOrder = order;

      if (
        order.paymentStatus !== "SUCCESS"
      ) {
        updatedOrder =
          await prisma.paymentOrder.update({
            where: {
              merchantOrderId,
            },

            data: {
              paymentStatus: "SUCCESS",

              phonePeOrderId,
            },
          });

        console.log(
          "✅ MongoDB order marked SUCCESS:",
          merchantOrderId
        );
      } else {
        console.log(
          "MongoDB order already SUCCESS:",
          merchantOrderId
        );
      }

      // -------------------------------------------
      // 7. SEND EMAIL ONLY ONCE
      // -------------------------------------------

      if (
        updatedOrder.emailStatus ===
        "NOT_SENT"
      ) {
        console.log(
          "📧 Sending payment confirmation emails..."
        );

        try {
          await sendPaymentConfirmationEmail({
            customerName:
              updatedOrder.customerName,

            customerEmail:
              updatedOrder.customerEmail,

            mobile:
              updatedOrder.mobile,

            ticketName:
              updatedOrder.ticketName,

            ticketType:
              updatedOrder.ticketType,

            quantity:
              updatedOrder.quantity,

            amount:
              amount / 100,

            merchantOrderId:
              updatedOrder.merchantOrderId,

            phonePeOrderId,
          });

          // ---------------------------------------
          // 8. Mark email as SENT
          // ---------------------------------------

          await prisma.paymentOrder.update({
            where: {
              merchantOrderId,
            },

            data: {
              emailStatus: "SENT",
            },
          });

          console.log(
            "✅ Payment emails sent successfully."
          );

        } catch (emailError) {
          console.error(
            "❌ Payment email failed:",
            emailError
          );

          // ---------------------------------------
          // Mark email as FAILED
          // ---------------------------------------

          await prisma.paymentOrder.update({
            where: {
              merchantOrderId,
            },

            data: {
              emailStatus: "FAILED",
            },
          });

          // IMPORTANT:
          // Payment is still SUCCESS.
          // Only email failed.
        }
      } else {
        console.log(
          "📧 Email already processed:",
          updatedOrder.emailStatus
        );
      }

      // -------------------------------------------
      // 9. Return SUCCESS
      // -------------------------------------------

      return NextResponse.json({
        success: true,

        paymentStatus: "SUCCESS",

        orderId: merchantOrderId,

        phonePeOrderId,

        amount,

        state,

        emailStatus:
          updatedOrder.emailStatus,
      });
    }

    // =============================================
    // PAYMENT FAILED
    // =============================================

    if (state === "FAILED") {
      console.log(
        "❌ PhonePe payment FAILED:",
        merchantOrderId
      );

      // -------------------------------------------
      // Update MongoDB
      // -------------------------------------------

      if (
        order.paymentStatus !== "FAILED"
      ) {
        await prisma.paymentOrder.update({
          where: {
            merchantOrderId,
          },

          data: {
            paymentStatus: "FAILED",

            phonePeOrderId,
          },
        });

        console.log(
          "❌ MongoDB order marked FAILED:",
          merchantOrderId
        );
      }

      return NextResponse.json({
        success: true,

        paymentStatus: "FAILED",

        orderId: merchantOrderId,

        phonePeOrderId,

        state,
      });
    }

    // =============================================
    // PAYMENT PENDING
    // =============================================

    console.log(
      "⏳ PhonePe payment still pending:",
      merchantOrderId,
      state
    );

    return NextResponse.json({
      success: true,

      paymentStatus: "PENDING",

      orderId: merchantOrderId,

      phonePeOrderId,

      state: state || "UNKNOWN",
    });

  } catch (error) {
    // ---------------------------------------------
    // GLOBAL ERROR
    // ---------------------------------------------

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