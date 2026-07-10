"use client";

import Image from "next/image";

const partners = [
  {
    title: "Creative Media Partner",
    logo: "/partners/cm.png",
  },
  {
    title: "Costume & Fashion Partner",
    logo: "/partners/ea.png",
  },
  {
    title: "Supporting Partner",
    logo: "/partners/support.png", // Replace with your logo
  },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-[#070707] py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[180px]" />
        <div className="absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />
        <div className="absolute -right-40 top-40 h-[350px] w-[350px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
            Our Partners
          </span>

          <h2 className="mt-8 font-display text-5xl font-light leading-tight md:text-6xl">
            <span className="text-white">Our Trusted</span>
            <br />
            <span className="bg-gradient-to-r from-[#FFF9E8] via-[#D4AF37] to-[#FFF4CC] bg-clip-text text-transparent">
              Partners
            </span>
          </h2>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="mx-4 h-2 w-2 rounded-full bg-[#D4AF37]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#CFCFCF]">
            We are honored to collaborate with organizations that share our
            passion for excellence, creativity, and making a lasting impact
            through The OAK Project.
          </p>
        </div>

        {/* Partner Cards */}
        <div className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.title}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#141414] to-[#0D0D0D] p-[1px] transition-all duration-500 hover:-translate-y-3 hover:border-[#D4AF37]/50 hover:shadow-[0_30px_70px_rgba(212,175,55,0.18)]"
            >
              <div className="relative flex min-h-[330px] flex-col items-center justify-center rounded-[32px] bg-[#0B0B0B] px-8 py-12">
                {/* Gold Glow */}
                <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Corner Decoration */}
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[60px] border-l border-b border-[#D4AF37]/15" />

                {/* Circular Logo */}
                <div className="relative z-10 mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-white to-[#F8F8F8] p-8 shadow-[0_20px_50px_rgba(255,255,255,0.12)] ring-1 ring-gray-200 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_25px_60px_rgba(212,175,55,0.28)]">
                  <Image
                    src={partner.logo}
                    alt={partner.title}
                    width={120}
                    height={120}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>

                {/* Partner Type */}
                <span className="text-center text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                  {partner.title}
                </span>

                {/* Divider */}
                <div className="my-6 h-px w-16 bg-[#D4AF37]/40 transition-all duration-300 group-hover:w-28" />

                {/* Description */}
                {/* <p className="max-w-sm text-center text-sm leading-7 text-[#BDBDBD]">
                  Proudly supporting The OAK Project through collaboration,
                  innovation, and a shared vision of excellence.
                </p> */}

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#D4AF37] to-[#F5D56A] transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}