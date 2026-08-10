
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The OAK Project",
  description:
    "Privacy Policy explaining how The OAK Project collects, uses, stores, and protects personal information.",
};

const sections = [
  {
    number: "1",
    title: "ABOUT THE OAK PROJECT",
    content: (
      <p>
        The OAK Project is a music collective and live music initiative
        involved in musical performances, concerts, events, bookings,
        collaborations, and related activities.
        <br />
        <br />
        Our website may provide information about our musicians, upcoming
        events, event registrations, partnerships, bookings, sponsorship
        opportunities, and other activities.
      </p>
    ),
  },
  {
    number: "2",
    title: "INFORMATION WE COLLECT",
    content: (
      <>
        <p>
          Depending on how you interact with our website, we may collect the
          following information:
        </p>

        <h3 className="mt-7 font-semibold text-white">
          Personal Information
        </h3>

        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing or transaction information where applicable</li>
          <li>Event registration details</li>
          <li>Booking or enquiry details</li>
          <li>Sponsorship or partnership information</li>
          <li>Any other information you voluntarily provide to us</li>
        </ul>

        <h3 className="mt-7 font-semibold text-white">
          Technical Information
        </h3>

        <p className="mt-3">
          When you visit our website, certain technical information may
          automatically be collected, such as:
        </p>

        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type</li>
          <li>Operating system</li>
          <li>Pages visited</li>
          <li>Date and time of access</li>
          <li>Referring website or source</li>
          <li>General website usage information</li>
        </ul>

        <p>
          This information may be used to maintain website security, improve
          performance, and understand how visitors use our website.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "INFORMATION YOU PROVIDE THROUGH FORMS",
    content: (
      <>
        <p>
          Our website may contain enquiry, booking, registration, sponsorship,
          or contact forms.
        </p>

        <p className="mt-5">
          When you submit information through these forms, we may use the
          information you provide to:
        </p>

        <ul>
          <li>Respond to your enquiry</li>
          <li>Contact you regarding an event or booking</li>
          <li>Process registrations</li>
          <li>Manage event participation</li>
          <li>Process sponsorship or partnership enquiries</li>
          <li>Provide requested information or services</li>
          <li>
            Communicate important updates relating to your enquiry or
            registration
          </li>
        </ul>

        <p>
          Please ensure that the information you provide is accurate and
          belongs to you or that you have permission to provide it.
        </p>
      </>
    ),
  },
  {
    number: "4",
    title: "EVENT REGISTRATION AND PAYMENTS",
    content: (
      <>
        <p>
          For certain events, registrations, tickets, donations, sponsorships,
          or other transactions, we may use third-party payment processors or
          payment gateway providers.
        </p>

        <p className="mt-5">
          We may receive limited transaction-related information from these
          providers, such as:
        </p>

        <ul>
          <li>Transaction status</li>
          <li>Transaction reference or order ID</li>
          <li>Amount paid</li>
          <li>Date and time of transaction</li>
          <li>Registration or booking information</li>
        </ul>

        <p>
          Payment card details, UPI credentials, banking passwords, and other
          sensitive payment credentials are generally processed directly by
          the relevant payment gateway and are not stored by The OAK Project
          unless explicitly stated otherwise.
        </p>

        <p>
          Your use of a third-party payment service may also be subject to that
          provider&apos;s own privacy policy and terms.
        </p>
      </>
    ),
  },
  {
    number: "5",
    title: "HOW WE USE YOUR INFORMATION",
    content: (
      <>
        <p>
          We may use your information for legitimate business and operational
          purposes, including:
        </p>

        <ul>
          <li>Processing event registrations and bookings</li>
          <li>Responding to enquiries</li>
          <li>Managing event participation</li>
          <li>Processing payments and registrations</li>
          <li>Communicating event-related information</li>
          <li>Managing sponsorships and partnerships</li>
          <li>Providing customer support</li>
          <li>Improving our website and user experience</li>
          <li>Preventing fraudulent or unauthorized activity</li>
          <li>Maintaining website security</li>
          <li>Complying with applicable laws and legal requirements</li>
          <li>
            Sending relevant updates where you have provided permission or
            where legally permitted
          </li>
        </ul>

        <p className="font-medium text-white">
          We do not intend to sell your personal information to third parties.
        </p>
      </>
    ),
  },
  {
    number: "6",
    title: "COOKIES AND SIMILAR TECHNOLOGIES",
    content: (
      <>
        <p>
          Our website may use cookies and similar technologies to improve
          functionality, understand website traffic, remember preferences,
          and provide a better user experience.
        </p>

        <p className="mt-5">Cookies may be used for purposes such as:</p>

        <ul>
          <li>Website functionality</li>
          <li>Analytics</li>
          <li>Performance monitoring</li>
          <li>Security</li>
          <li>Understanding visitor behaviour</li>
        </ul>

        <p>
          You may be able to control or disable cookies through your browser
          settings. Disabling certain cookies may affect some website
          functionality.
        </p>
      </>
    ),
  },
  {
    number: "7",
    title: "THIRD-PARTY SERVICES",
    content: (
      <>
        <p>
          Our website may use or link to third-party services, platforms,
          websites, social media networks, payment gateways, analytics
          services, or other external services.
        </p>

        <p>
          These third parties may process information according to their own
          privacy policies and terms.
        </p>

        <p>
          The OAK Project is not responsible for the privacy practices,
          content, security, or policies of third-party websites or services
          that you may access through our website.
        </p>

        <p>
          We encourage you to review the privacy policies of third-party
          services before providing them with personal information.
        </p>
      </>
    ),
  },
  {
    number: "8",
    title: "SOCIAL MEDIA",
    content: (
      <>
        <p>
          Our website may contain links to social media platforms, including
          Instagram, YouTube, or other platforms.
        </p>

        <p>
          If you interact with these platforms, your information may be
          processed according to the privacy policy of the respective
          platform.
        </p>

        <p>
          We recommend reviewing the privacy policies of those platforms for
          further information about how they collect and process your
          information.
        </p>
      </>
    ),
  },
  {
    number: "9",
    title: "SHARING OF INFORMATION",
    content: (
      <>
        <p>
          We may share personal information only when reasonably necessary for
          legitimate purposes, including with:
        </p>

        <ul>
          <li>Payment gateway providers</li>
          <li>Event registration or ticketing service providers</li>
          <li>Website hosting and technology service providers</li>
          <li>Analytics or technical service providers</li>
          <li>
            Event partners or service providers where necessary to fulfil an
            event-related request
          </li>
          <li>Professional advisers where reasonably necessary</li>
          <li>
            Government authorities or law-enforcement agencies where required
            by applicable law
          </li>
        </ul>

        <p>
          We expect third-party service providers handling information on our
          behalf to take reasonable measures to protect that information.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "DATA SECURITY",
    content: (
      <>
        <p>
          We take reasonable administrative, technical, and organizational
          measures to protect personal information against unauthorized
          access, misuse, alteration, disclosure, or destruction.
        </p>

        <p>
          However, no method of transmitting or storing information online can
          be guaranteed to be completely secure.
        </p>

        <p>
          Therefore, while we take reasonable precautions to protect your
          information, we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "DATA RETENTION",
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary for the purposes described in this Privacy Policy,
          including:
        </p>

        <ul>
          <li>Completing transactions</li>
          <li>Managing registrations and bookings</li>
          <li>Maintaining business and financial records</li>
          <li>Responding to enquiries</li>
          <li>Resolving disputes</li>
          <li>
            Meeting legal, regulatory, accounting, or reporting requirements
          </li>
        </ul>

        <p>
          When information is no longer required, we may securely delete,
          anonymize, or otherwise dispose of it, subject to applicable legal
          requirements.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "YOUR PRIVACY RIGHTS",
    content: (
      <>
        <p>
          Depending on applicable law, you may have certain rights regarding
          your personal information, including the right to:
        </p>

        <ul>
          <li>
            Request access to personal information we hold about you
          </li>
          <li>Request correction of inaccurate information</li>
          <li>
            Request deletion of information where legally permitted
          </li>
          <li>
            Withdraw consent where processing is based on consent
          </li>
          <li>
            Request information regarding how your personal data is processed
          </li>
          <li>
            Raise concerns regarding our handling of your personal information
          </li>
        </ul>

        <p>
          To exercise any applicable rights, you may contact us using the
          details provided below.
        </p>

        <p>
          We may need to verify your identity before processing certain
          requests.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "CHILDREN'S PRIVACY",
    content: (
      <>
        <p>
          Our website is not intended to knowingly collect personal information
          from children without appropriate consent or authorization.
        </p>

        <p>
          If you believe that a child has provided personal information to us
          without appropriate consent, please contact us so that we can take
          reasonable steps to address the situation.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "EXTERNAL LINKS",
    content: (
      <>
        <p>
          Our website may contain links to external websites, including social
          media platforms, event partners, sponsors, payment providers, or
          other websites.
        </p>

        <p>
          We do not control these websites and are not responsible for their
          privacy practices.
        </p>

        <p>
          We encourage users to review the privacy policies of external
          websites before providing personal information.
        </p>
      </>
    ),
  },
  {
    number: "15",
    title: "CHANGES TO THIS PRIVACY POLICY",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our services, website, technology, legal requirements, or
          business practices.
        </p>

        <p>
          Any updated version will be published on this page with a revised
          &quot;Last Updated&quot; date.
        </p>

        <p>We encourage you to review this page periodically.</p>
      </>
    ),
  },
  {
    number: "16",
    title: "CONTACT US",
    content: (
      <>
        <p>
          If you have questions, concerns, requests, or complaints regarding
          this Privacy Policy or the way we handle your personal information,
          please contact us:
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

          <p className="mt-2">
            <span className="font-medium text-white">Website:</span>{" "}
            <a
              href="https://oakproject.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 transition hover:text-amber-300"
            >
              oakproject.in
            </a>
          </p>
        </div>

        <p className="mt-6">
          We will make reasonable efforts to respond to privacy-related
          enquiries within an appropriate timeframe.
        </p>
      </>
    ),
  },
  {
    number: "17",
    title: "ACCEPTANCE OF THIS PRIVACY POLICY",
    content: (
      <>
        <p>
          By using oakproject.in, submitting an enquiry, registering for an
          event, making a booking, or providing personal information through
          our website, you acknowledge that you have read and understood this
          Privacy Policy.
        </p>

        <p className="mt-8 text-sm text-neutral-500">
          © 2026 The OAK Project. All rights reserved.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy
              <span className="block text-amber-400">Policy</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              We respect your privacy and are committed to protecting the
              personal information you share with The OAK Project.
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

      {/* Content */}
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
                The OAK Project (&quot;OAK Project&quot;, &quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;) respects your privacy and
                is committed to protecting the personal information you share
                with us.
              </p>

              <p className="mt-5 leading-8 text-neutral-400">
                This Privacy Policy explains how we collect, use, store, and
                protect your information when you visit or interact with our
                website, oakproject.in, register for our events, submit an
                enquiry, contact us, make a payment, or otherwise use our
                services.
              </p>

              <p className="mt-5 font-medium leading-8 text-white">
                By using our website, you agree to the practices described in
                this Privacy Policy.
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

            {/* Contact Card */}
            <div className="mt-20 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-950 p-8 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-400">
                Privacy Questions?
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Need help with your personal information?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
                If you have questions, concerns, requests, or complaints
                regarding this Privacy Policy, please get in touch with The
                OAK Project.
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
