"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";

export type TicketType =
  | "KINGDOM_ALIVE"
  | "SIGNATURE"
  | "DONOR"
  | "SPONSORSHIP";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: TicketType | null;
}

const TICKETS: Record<
  TicketType,
  {
    name: string;
    price: number;
  }
> = {
  KINGDOM_ALIVE: {
    name: "Kingdom Alive Pass",
    price: 299,
  },
  SIGNATURE: {
    name: "Signature Pass",
    price: 999,
  },
  DONOR: {
    name: "Donor Pass",
    price: 2999,
  },
  SPONSORSHIP: {
    name: "Sponsorship Pass",
    price: 9999,
  },
};

export default function CheckoutModal({
  isOpen,
  onClose,
  ticketType,
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const selectedTicket = ticketType ? TICKETS[ticketType] : null;

  const totalAmount = selectedTicket
    ? selectedTicket.price * quantity
    : 0;

  useEffect(() => {
    if (!isOpen) {
      setFullName("");
      setEmail("");
      setMobile("");
      setQuantity(1);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen || !selectedTicket) {
    return null;
  }

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!ticketType) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(
      "/api/payment/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ticketType,
          fullName,
          email,
          mobile,
          quantity,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Unable to create payment."
      );
    }

    if (!data.redirectUrl) {
      throw new Error(
        "PhonePe checkout URL was not returned."
      );
    }

    // Redirect customer to PhonePe
    window.location.href =
      data.redirectUrl;
  } catch (error) {
    console.error(
      "PhonePe checkout error:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Unable to start payment. Please try again."
    );

    setIsLoading(false);
  }
};

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#2b2a25] bg-[#11110f] shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-[#a8a39a] transition hover:bg-white/5 hover:text-white"
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8 pr-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#c9a45c]">
              Secure Checkout
            </p>

            <h2 className="font-serif text-3xl text-[#f5f1e8]">
              Complete Your Pass
            </h2>

            <p className="mt-2 text-sm text-[#8f8b83]">
              Enter your details to continue with your purchase.
            </p>
          </div>

          {/* Selected ticket summary */}
          <div className="mb-7 rounded-xl border border-[#2b2a25] bg-[#0b0b0a] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#77736c]">
                  Selected Pass
                </p>

                <h3 className="mt-2 font-serif text-xl text-[#f5f1e8]">
                  {selectedTicket.name}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#77736c]">Price</p>

                <p className="mt-1 text-lg font-semibold text-[#d8b875]">
                  ₹{selectedTicket.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-[#d8d3ca]"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-[#302f2a] bg-[#0b0b0a] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#66625c] transition focus:border-[#c9a45c]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#d8d3ca]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="w-full rounded-xl border border-[#302f2a] bg-[#0b0b0a] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#66625c] transition focus:border-[#c9a45c]"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="mb-2 block text-sm font-medium text-[#d8d3ca]"
              >
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setMobile(value.slice(0, 10));
                }}
                placeholder="10-digit mobile number"
                required
                minLength={10}
                maxLength={10}
                disabled={isLoading}
                className="w-full rounded-xl border border-[#302f2a] bg-[#0b0b0a] px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#66625c] transition focus:border-[#c9a45c]"
              />
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-medium text-[#d8d3ca]"
              >
                Quantity
              </label>

              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={isLoading}
                className="w-full appearance-none rounded-xl border border-[#302f2a] bg-[#0b0b0a] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#c9a45c]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            {/* Total */}
            <div className="border-t border-[#2b2a25] pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8f8b83]">
                    {quantity} × {selectedTicket.name}
                  </p>

                  <p className="mt-1 text-xs text-[#66625c]">
                    Total Amount
                  </p>
                </div>

                <p className="font-serif text-2xl font-semibold text-[#d8b875]">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Pay button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                flex w-full items-center justify-center gap-2
                rounded-xl bg-[#c9a45c]
                px-5 py-4
                text-sm font-bold
                text-[#11110f]
                transition-all duration-300
                hover:bg-[#dfc27e]
                hover:shadow-[0_0_30px_rgba(201,164,92,0.2)]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay with PhonePe
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-[11px] leading-5 text-[#66625c]">
              You will be securely redirected to PhonePe to complete your
              payment.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}