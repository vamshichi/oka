
"use client";

import { ArrowRight, Check } from "lucide-react";

interface TicketPriceProps {
  price?: number;
  title?: string;
  description?: string;
  buttonText?: string;
  features?: string[];
  onBuy?: () => void;
}

export default function TicketPrice({
  price = 249,
  title = "General Pass",
  description = "Get access to The OAK Project experience.",
  buttonText = "Get Your Ticket",
  features = [
    "Event entry",
    "Access to live performances",
    "Digital ticket confirmation",
  ],
  onBuy,
}: TicketPriceProps) {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-gold/20 bg-[#0c0c0c] p-6 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 items-center hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-all duration-500 group-hover:bg-gold/20" />

      {/* Top */}
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              The OAK Project
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-white">
              {title}
            </h3>
          </div>

          <div className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            Ticket
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-warm-gray">
          {description}
        </p>
      </div>

      {/* Price */}
      <div className="relative mt-8 border-y border-white/10 py-6">
        <p className="text-xs uppercase tracking-[0.2em] text-warm-gray/60">
          Starting From
        </p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-5xl font-semibold tracking-tight text-white">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <span className="mb-2 text-sm text-warm-gray">
            / person
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="relative mt-6 space-y-3">
        {features.map((feature, index) => (
          <div
            key={`${feature}-${index}`}
            className="flex items-center gap-3 text-sm text-warm-gray"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Check size={12} strokeWidth={2.5} />
            </span>

            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={onBuy}
        className="relative mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
      >
        {buttonText}

        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {/* Footer */}
      <p className="mt-4 text-center text-[11px] tracking-wide text-warm-gray/40">
        Secure registration · Instant confirmation
      </p>
    </div>
  );
}
