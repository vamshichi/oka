"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  Ticket,
} from "lucide-react";

type PaymentStatus =
  | "loading"
  | "success"
  | "failed"
  | "pending";

interface PaymentResult {
  success: boolean;
  paymentStatus:
    | "SUCCESS"
    | "FAILED"
    | "PENDING";
  orderId: string;
  phonePeOrderId?: string;
  amount?: number | null;
  state?: string;
  message?: string;
}

interface PaymentSuccessPageProps {
  searchParams: {
    orderId?: string;
  };
}

export default function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const orderId = searchParams?.orderId ?? "";

  const [status, setStatus] =
    useState<PaymentStatus>("loading");

  const [payment, setPayment] =
    useState<PaymentResult | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    let cancelled = false;

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/payment/status?orderId=${encodeURIComponent(
            orderId
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data =
          (await response.json()) as PaymentResult;

        if (cancelled) {
          return;
        }

        setPayment(data);

        if (
          data.success &&
          data.paymentStatus === "SUCCESS"
        ) {
          setStatus("success");
          return;
        }

        if (
          data.paymentStatus === "FAILED"
        ) {
          setStatus("failed");
          return;
        }

        setStatus("pending");
      } catch (error) {
        console.error(
          "Payment verification error:",
          error
        );

        if (!cancelled) {
          setStatus("failed");
        }
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  /*
   * LOADING
   */
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6">
        <div className="text-center">
          <Loader2
            size={42}
            className="mx-auto animate-spin text-[#c9a45c]"
          />

          <h1 className="mt-6 font-serif text-3xl text-[#f5f1e8]">
            Verifying Your Payment
          </h1>

          <p className="mt-3 text-sm text-[#8f8b83]">
            Please wait while we confirm your
            payment with PhonePe.
          </p>
        </div>
      </main>
    );
  }

  /*
   * SUCCESS
   */
  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-[#2b2a25] bg-[#11110f] p-7 text-center shadow-2xl sm:p-10">
          <CheckCircle2
            size={64}
            strokeWidth={1.5}
            className="mx-auto text-[#c9a45c]"
          />

          <p className="mt-7 text-xs font-medium uppercase tracking-[0.3em] text-[#c9a45c]">
            The OAK Project
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#f5f1e8]">
            Payment Successful
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#a8a39a]">
            Thank you for being part of The OAK
            Project.
          </p>

          <div className="mt-8 rounded-xl border border-[#2b2a25] bg-[#0b0b0a] p-5 text-left">
            <div className="flex items-center gap-3 border-b border-[#2b2a25] pb-4">
              <Ticket
                size={20}
                className="text-[#c9a45c]"
              />

              <div>
                <p className="text-xs text-[#77736c]">
                  Pass
                </p>

                <p className="mt-1 text-sm font-medium text-[#f5f1e8]">
                  The OAK Project Pass
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-5">
              <div className="flex justify-between gap-4">
                <span className="text-sm text-[#77736c]">
                  Amount Paid
                </span>

                <span className="text-sm font-semibold text-[#d8b875]">
                  {payment?.amount != null
                    ? `₹${(
                        payment.amount / 100
                      ).toLocaleString("en-IN")}`
                    : "Confirmed"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-[#77736c]">
                  PhonePe Order ID
                </span>

                <span className="max-w-[220px] break-all text-right text-xs text-[#d8d3ca]">
                  {payment?.phonePeOrderId ||
                    payment?.orderId ||
                    orderId}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#3a3832] px-5 py-3.5 text-sm font-medium text-[#f5f1e8] transition hover:border-[#c9a45c]/60 hover:bg-white/[0.03]"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            <Link
              href="/#tickets"
              className="flex items-center justify-center rounded-xl bg-[#c9a45c] px-5 py-3.5 text-sm font-semibold text-[#11110f] transition hover:bg-[#dfc27e]"
            >
              Buy Another Pass
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * PENDING
   */
  if (status === "pending") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-[#2b2a25] bg-[#11110f] p-8 text-center">
          <Loader2
            size={54}
            className="mx-auto animate-spin text-[#c9a45c]"
          />

          <h1 className="mt-6 font-serif text-3xl text-[#f5f1e8]">
            Payment Processing
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#a8a39a]">
            Your payment is still being processed.
            Please wait a moment before trying again.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#3a3832] px-6 py-3 text-sm text-[#f5f1e8] transition hover:border-[#c9a45c]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  /*
   * FAILED
   */
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#2b2a25] bg-[#11110f] p-8 text-center sm:p-10">
        <XCircle
          size={64}
          strokeWidth={1.5}
          className="mx-auto text-[#c9a45c]"
        />

        <p className="mt-7 text-xs font-medium uppercase tracking-[0.3em] text-[#c9a45c]">
          The OAK Project
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#f5f1e8]">
          Payment Failed
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#a8a39a]">
          Your payment could not be completed.
          Please try again.
        </p>

        <Link
          href="/#tickets"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#c9a45c] px-8 py-3.5 text-sm font-semibold text-[#11110f] transition hover:bg-[#dfc27e]"
        >
          Try Again
        </Link>

        <div>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-[#8f8b83] transition hover:text-[#f5f1e8]"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}