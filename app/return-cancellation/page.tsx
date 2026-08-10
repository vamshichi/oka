
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Cancellation Policy | The OAK Project",
  description:
    "Return, cancellation and refund policy for event passes, tickets, registrations and purchases made through The OAK Project.",
};

const sections = [
  {
    number: "1",
    title: "EVENT PASSES & TICKETS",
    content: (
      <>
        <p>
          All event passes and tickets purchased through our website are issued
          for specific events, dates, and venues.
        </p>

        <p>
          Due to the nature of event bookings, event passes and tickets are
          generally non-refundable and non-returnable once the payment has
          been successfully completed.
        </p>

        <p>
          Please review the event details, date, venue, ticket/pass category,
          and quantity carefully before completing your purchase.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "CANCELLATION BY THE CUSTOMER",
    content: (
      <>
        <p>
          Once an event pass or ticket has been purchased, cancellation
          requests initiated by the customer may not be eligible for a refund.
        </p>

        <p>
          Tickets or passes that are unused, partially used, lost, damaged, or
          not presented at the venue will not ordinarily qualify for a refund.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "EVENT CANCELLATION OR POSTPONEMENT",
    content: (
      <>
        <p>
          If an event is cancelled by The OAK Project, we will communicate the
          available options to registered ticket holders.
        </p>

        <p>Depending on the circumstances, we may offer:</p>

        <ul>
          <li>A full or partial refund;</li>
          <li>Transfer of the ticket to a rescheduled event; or</li>
          <li>
            Another appropriate resolution communicated by The OAK Project.
          </li>
        </ul>

        <p>
          If an event is postponed or rescheduled, tickets purchased for the
          original event may remain valid for the new date, subject to the
          communication issued by The OAK Project.
        </p>
      </>
    ),
  },
  {
    number: "4",
    title: "REFUNDS",
    content: (
      <>
        <p>
          Where a refund has been approved, the refund will generally be
          processed to the original payment method used for the transaction.
        </p>

        <p>
          The time taken for the refunded amount to appear in your bank account
          or payment method may depend on the relevant bank, card issuer, UPI
          provider, or payment gateway.
        </p>

        <p>
          Any applicable payment gateway charges, transaction charges, or other
          non-refundable fees may be deducted where permitted.
        </p>
      </>
    ),
  },
  {
    number: "5",
    title: "DUPLICATE OR FAILED TRANSACTIONS",
    content: (
      <>
        <p>
          If your account has been debited more than once for the same
          transaction, please contact us with the relevant transaction details.
        </p>

        <p>
          After verification, any confirmed duplicate payment may be refunded
          through the appropriate payment channel.
        </p>

        <p>
          If a payment has failed but the amount has been debited from your
          account, please allow the payment gateway or bank&apos;s normal
          settlement period for automatic reversal.
        </p>

        <p>
          If the amount is not reversed within the expected period, please
          contact us with your transaction details.
        </p>
      </>
    ),
  },
  {
    number: "6",
    title: "INCORRECT INFORMATION",
    content: (
      <>
        <p>
          Customers are responsible for providing accurate information while
          purchasing or registering for an event.
        </p>

        <p>
          The OAK Project will not be responsible for issues arising due to
          incorrect or incomplete information provided by the customer,
          including incorrect name, phone number, email address, or other
          registration details.
        </p>
      </>
    ),
  },
  {
    number: "7",
    title: "TRANSFER OF TICKETS",
    content: (
      <>
        <p>
          Event passes or tickets may not be transferable unless The OAK
          Project specifically permits ticket transfers for the particular
          event.
        </p>

        <p>
          Any approved transfer must comply with the instructions and deadlines
          communicated by The OAK Project.
        </p>
      </>
    ),
  },
  {
    number: "8",
    title: "PROMOTIONAL OR COMPLIMENTARY PASSES",
    content: (
      <>
        <p>
          Promotional, complimentary, donor, sponsor, or special-category
          passes may be subject to additional terms and conditions.
        </p>

        <p>
          Such passes may not have any cash value and may not be eligible for
          refund or exchange.
        </p>
      </>
    ),
  },
  {
    number: "9",
    title: "HOW TO REQUEST ASSISTANCE",
    content: (
      <>
        <p>
          For any payment, ticket, cancellation, or refund-related enquiry,
          please contact us with:
        </p>

        <ul>
          <li>Full Name</li>
          <li>Registered Email Address</li>
          <li>Phone Number</li>
          <li>Order/Transaction ID</li>
          <li>Event Name</li>
          <li>Date of Purchase</li>
          <li>Details of the issue</li>
        </ul>

        <div className="mt-7 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <p className="font-semibold text-white">The OAK Project</p>

          <p className="mt-4">
            <span className="font-medium text-white">Email:</span>{" "}
            <a
              href="mailto:theoakproject.gospelband@gmail.com"
              className="break-all text-amber-400 transition hover:text-amber-300"
            >
              theoakproject.gospelband@gmail.com
            </a>
          </p>

          <p className="mt-2">
            <span className="font-medium text-white">Phone:</span>{" "}
            <a
              href="tel:+918277360316"
              className="text-amber-400 transition hover:text-amber-300"
            >
              +91 8277360316
            </a>
          </p>
        </div>

        <p className="mt-6">
          We will review your request and respond as soon as reasonably
          possible.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "POLICY CHANGES",
    content: (
      <>
        <p>
          The OAK Project reserves the right to modify or update this Return &
          Cancellation Policy at any time.
        </p>

        <p>
          Any changes will be published on this page with the updated Last
          Updated date.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "CONTACT US",
    content: (
      <>
        <p>
          If you have any questions regarding this policy or your purchase,
          please contact:
        </p>

        <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <p className="font-semibold text-white">The OAK Project</p>

          <p className="mt-4">
            <span className="font-medium text-white">Email:</span>{" "}
            <a
              href="mailto:theoakproject.gospelband@gmail.com"
              className="break-all text-amber-400 transition hover:text-amber-300"
            >
              theoakproject.gospelband@gmail.com
            </a>
          </p>

          <p className="mt-2">
            <span className="font-medium text-white">Phone:</span>{" "}
            <a
              href="tel:+918277360316"
              className="text-amber-400 transition hover:text-amber-300"
            >
              +91 8277360316
            </a>
          </p>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          © 2026 The OAK Project. All rights reserved.
        </p>
      </>
    ),
  },
];

export default function ReturnCancellationPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-neutral-300">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.06),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-amber-500" />

              <span className="text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Legal
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Return &amp;
              <span className="block text-amber-400">
                Cancellation Policy
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              Important information about cancellations, refunds, event passes,
              tickets, registrations, and purchases made through The OAK
              Project.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
              <span>Last Updated</span>

              <span className="h-1 w-1 rounded-full bg-amber-500" />

              <span className="text-neutral-300">
                August 10, 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-10">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Contents
              </p>

              <nav className="max-h-[70vh] space-y-1 overflow-y-auto pr-4">
                {sections.map((section) => (
                  <a
                    key={section.number}
                    href={`#section-${section.number}`}
                    className="group flex gap-3 rounded-lg px-3 py-2 text-sm text-neutral-500 transition hover:bg-white/5 hover:text-white"
                  >
                    <span className="w-6 shrink-0 text-neutral-700 group-hover:text-amber-400">
                      {section.number.padStart(2, "0")}
                    </span>

                    <span className="leading-5">
                      {section.title}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy */}
          <article className="min-w-0">
            {/* Introduction */}
            <div className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8">
              <p className="text-lg leading-8 text-neutral-300">
                Thank you for choosing The OAK Project.
              </p>

              <p className="mt-5 leading-8 text-neutral-400">
                This Return &amp; Cancellation Policy explains the terms
                applicable to event passes, tickets, registrations, and other
                purchases made through the official website of The OAK Project.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-16">
              {sections.map((section) => (
                <section
                  key={section.number}
                  id={`section-${section.number}`}
                  className="scroll-mt-10"
                >
                  <div className="mb-6 flex items-start gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-sm font-semibold text-amber-400">
                      {section.number}
                    </span>

                    <h2 className="pt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="border-l border-neutral-800 pl-5 text-[15px] leading-8 text-neutral-400 sm:pl-8">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Assistance Card */}
            <div className="mt-20 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-950 p-8 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-400">
                Need Assistance?
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Questions about a refund or cancellation?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
                If you have a question about your ticket, payment,
                cancellation, or refund, contact The OAK Project with your
                transaction details and we&apos;ll review your request.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:theoakproject.gospelband@gmail.com"
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
                >
                  Contact Us
                </a>

                <a
                  href="tel:+918277360316"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-neutral-500 hover:bg-white/5"
                >
                  +91 8277360316
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
