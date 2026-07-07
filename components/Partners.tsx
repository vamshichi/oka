"use client";

import Image from "next/image";

const partners = [
  {
    title: "Creative Media Partner",
    logo: "/partners/cm.png",
  },
  {
    title: "Costume & Fashion Partner",
    logo: "/partners/ea.jpeg",
  },
//   {
//     title: "Marketing Partner",
//     logo: "/partners/marketing.png",
//   },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden py-28 px-6 bg-ink"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.35em] text-gold/70 text-sm mb-4">
            Our Partners
          </p>

          <h2 className="font-display text-5xl md:text-6xl font-light bg-gradient-to-r from-[#FFF6D6] via-[#D4AF37] to-[#FFF2B2] bg-clip-text text-transparent">
            Trusted Partners
          </h2>

          <div className="flex items-center justify-center mt-8">
            <div className="w-24 h-px bg-gold/40"></div>
            <div className="w-2 h-2 rounded-full bg-gold mx-4"></div>
            <div className="w-24 h-px bg-gold/40"></div>
          </div>

          <p className="mt-8 max-w-2xl mx-auto text-[#D9C8A3] leading-8">
            We are grateful for the organizations and brands that support the
            vision of The OAK Project and help us create meaningful experiences
            through worship, creativity, and excellence.
          </p>
        </div>

        {/* Partner Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {partners.map((partner) => (
            <div
              key={partner.title}
              className="group relative rounded-3xl border border-gold/15 bg-white/[0.03] backdrop-blur-md p-10 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
            >
              {/* Top Gold Line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

              <div className="flex flex-col items-center justify-center text-center min-h-[260px]">
                <p className="uppercase tracking-[0.22em] text-gold text-sm font-medium mb-10">
                  {partner.title}
                </p>

                <div className="relative flex items-center justify-center h-28 w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.title}
                    width={220}
                    height={100}
                    className="max-h-24 w-auto object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Gold Accent */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-gold/70 group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
