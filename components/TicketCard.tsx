"use client";

import { ArrowRight } from "lucide-react";

interface TicketCardProps {
  title: string;
  price: number;
  description: string;
  onBuy: () => void;
  featured?: boolean;
  contactText?: string;
}

export default function TicketCard({
  title,
  price,
  description,
  onBuy,
  featured = false,
  contactText,
}: TicketCardProps) {
  return (
    <div
      className={`
        group relative flex h-full flex-col justify-between
        overflow-hidden rounded-2xl border
        bg-[#11110f] p-6 sm:p-8
        transition-all duration-300
        hover:-translate-y-1
        ${
          featured
            ? "border-[#c9a45c]/70 shadow-[0_0_40px_rgba(201,164,92,0.08)]"
            : "border-[#2b2a25] hover:border-[#c9a45c]/50"
        }
      `}
    >
      {/* Gold glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-40 w-40
          rounded-full
          bg-[#c9a45c]/5
          blur-3xl
          transition-all duration-300
          group-hover:bg-[#c9a45c]/10
        "
      />

      <div className="relative">
        {/* Featured label */}
        {featured && (
          <div className="mb-5 inline-flex rounded-full border border-[#c9a45c]/40 bg-[#c9a45c]/10 px-3 py-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d8b875]">
              Signature Experience
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-2xl font-medium tracking-wide text-[#f5f1e8] sm:text-3xl">
          {title}
        </h3>

        {/* Price */}
        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-sm text-[#a8a39a]">
            ₹
          </span>

          <span className="font-serif text-4xl font-semibold tracking-tight text-[#d8b875] sm:text-5xl">
            {price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Description */}
        <p className="mt-5 max-w-sm text-sm leading-6 text-[#b8b3aa]">
          {description}
        </p>

        {/* Sponsorship message */}
        {contactText && (
          <p className="mt-5 text-sm font-semibold leading-6 text-[#f5f1e8]">
            {contactText}
          </p>
        )}
      </div>

      {/* Buy button */}
      <div className="relative mt-8">
        <button
          type="button"
          onClick={onBuy}
          className="
            flex w-full
            items-center justify-center gap-2
            rounded-xl
            border border-[#c9a45c]
            bg-[#c9a45c]
            px-5 py-3.5
            text-sm font-semibold
            text-[#11110f]
            transition-all duration-300
            hover:bg-[#dfc27e]
            hover:shadow-[0_0_25px_rgba(201,164,92,0.18)]
            active:scale-[0.98]
          "
        >
          Get Your Pass

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}