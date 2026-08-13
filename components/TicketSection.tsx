"use client";

import { useState } from "react";

import TicketCard from "@/components/TicketCard";

import CheckoutModal, {
  TicketType,
} from "@/components/CheckoutModal";

export default function TicketSection() {
  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [selectedTicket, setSelectedTicket] =
    useState<TicketType | null>(null);

  const handleBuy = (ticketType: TicketType) => {
    setSelectedTicket(ticketType);
    setCheckoutOpen(true);
  };

  return (
    <>
      <section
        id="tickets"
        className="bg-[#090909] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#c9a45c]">
              The OAK Project
            </p>

            <h2 className="font-serif text-4xl text-[#f5f1e8] sm:text-5xl">
              Choose Your Pass
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#a8a39a]">
              Be part of an unforgettable experience.
            </p>
          </div>

          {/* Ticket Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <TicketCard
              title="Kingdom Alive Pass"
              price={299}
              description="Come ready to feel something unforgettable."
              onBuy={() =>
                handleBuy("KINGDOM_ALIVE")
              }
            />

            <TicketCard
              title="Signature Pass"
              price={999}
              description="Be part of something that lives beyond the moment."
              featured
              onBuy={() =>
                handleBuy("SIGNATURE")
              }
            />

            <TicketCard
              title="Donor Pass"
              price={2999}
              description="Every gift helps make this event a success."
              onBuy={() =>
                handleBuy("DONOR")
              }
            />

            <TicketCard
              title="Sponsorship Pass"
              price={9999}
              description="Sow into the vision. Invest in the Kingdom."
              contactText="Contact us for more information and partnership opportunities."
              onBuy={() =>
                handleBuy("SPONSORSHIP")
              }
            />

          </div>
        </div>
      </section>

      {/* Checkout */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() =>
          setCheckoutOpen(false)
        }
        ticketType={selectedTicket}
      />
    </>
  );
}