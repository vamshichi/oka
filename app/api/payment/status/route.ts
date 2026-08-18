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
    // GET ORDER ID
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
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // VALIDATE ORDER ID
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
        { status: 400 }
      );
    }

    console.log(
      "===================================="
    );

    console.log(
      "OAK PAYMENT STATUS"
    );

    console.log(
      "Merchant Order ID:",
      merchantOrderId
    );

    // ---------------------------------------------
    // FIND ORDER
    // ---------------------------------------------

    const order =
      await prisma.paymentOrder.findUnique({
        where: {
          merchantOrderId,
        },
      });

    if (!order) {
      console.error(
        "Order not found:",
        merchantOrderId
      );

      return NextResponse.json(
        {
          success: false,
          message: "Payment order not found.",
        },
        { status: 404 }
      );
    }

    console.log(
      "MongoDB order:",
      {
        id: order.id,
        paymentStatus:
          order.paymentStatus,
        emailStatus:
          order.emailStatus,
      }
    );

    // ---------------------------------------------
    // GET REAL PHONEPE STATUS
    // ---------------------------------------------

    const phonePeResponse =
      await getPhonePeOrderStatus(
        merchantOrderId
      );

    console.log(
      "PhonePe response:",
      phonePeResponse
    );

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

    console.log(
      "PhonePe state:",
      state
    );

    // =============================================
    // SUCCESS
    // =============================================

    if (state === "COMPLETED") {
      console.log(
        "Payment COMPLETED:",
        merchantOrderId
      );

      // -------------------------------------------
      // UPDATE PAYMENT STATUS
      // -------------------------------------------

      const updatedOrder =
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
        "MongoDB updated:",
        updatedOrder.paymentStatus
      );

      let emailStatus =
        updatedOrder.emailStatus;

      // -------------------------------------------
      // SEND EMAIL ONLY IF NOT ALREADY SENT
      // -------------------------------------------

      if (
        emailStatus !== "SENT"
      ) {
        console.log(
          "Sending payment confirmation email..."
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
          // EMAIL SUCCESS
          // ---------------------------------------

          await prisma.paymentOrder.update({
            where: {
              merchantOrderId,
            },

            data: {
              emailStatus: "SENT",
            },
          });

          emailStatus = "SENT";

          console.log(
            "EMAIL SENT SUCCESSFULLY"
          );

        } catch (emailError) {
          console.error(
            "EMAIL SENDING FAILED:",
            emailError
          );

          // Don't change payment status.
          // Payment is already successful.

          emailStatus = "FAILED";

          try {
            await prisma.paymentOrder.update({
              where: {
                merchantOrderId,
              },

              data: {
                emailStatus: "FAILED",
              },
            });
          } catch (dbError) {
            console.error(
              "Could not update email status:",
              dbError
            );
          }
        }
      } else {
        console.log(
          "Email already sent:",
          emailStatus
        );
      }

      // -------------------------------------------
      // RETURN SUCCESS
      // -------------------------------------------

      return NextResponse.json({
        success: true,

        paymentStatus: "SUCCESS",

        orderId: merchantOrderId,

        phonePeOrderId,

        amount,

        state,

        emailStatus,
      });
    }

    // =============================================
    // FAILED
    // =============================================

    if (state === "FAILED") {
      console.log(
        "Payment FAILED:",
        merchantOrderId
      );

      await prisma.paymentOrder.update({
        where: {
          merchantOrderId,
        },

        data: {
          paymentStatus: "FAILED",
          phonePeOrderId,
        },
      });

      return NextResponse.json({
        success: true,

        paymentStatus: "FAILED",

        orderId: merchantOrderId,

        phonePeOrderId,

        state,
      });
    }

    // =============================================
    // PENDING
    // =============================================

    console.log(
      "Payment still pending:",
      merchantOrderId,
      state
    );

    return NextResponse.json({
      success: true,

      paymentStatus: "PENDING",

      orderId: merchantOrderId,

      phonePeOrderId,

      state:
        state || "UNKNOWN",
    });

  } catch (error) {
    console.error(
      "PAYMENT STATUS API ERROR:",
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