"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  {
    title: "Creative Media Partner",
    logos: ["/partners/supporting.png"],
  },
  {
    title: "Costume & Fashion Partner",
    logos: ["/partners/ea.png"], // White logo recommended
  },
  {
    title: "Digital Partner",
    logos: ["/partners/digi.png"],
  },
  {
    title: "Supporting Partner",
    logos: ["/partners/cm.png", "/partners/ark.png"],
  },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-gradient-to-b from-[#090909] via-[#050505] to-black py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-3xl uppercase tracking-[0.45em] text-[#D4AF37]">
            OUR PARTNERS
          </p>

          {/* <h2 className="mt-5 text-5xl font-light text-white md:text-6xl">
            Proudly{" "}
            <span className="bg-gradient-to-r from-[#FFF5C2] via-[#D4AF37] to-[#FFF5C2] bg-clip-text text-transparent">
              Supported By
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-400">
            We are honored to collaborate with organizations that share our
            vision and continue supporting The OAK Project.
          </p> */}
        </motion.div>

        {/* ================= TOP GRID ================= */}

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {partners.slice(0, 3).map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.15)]"
            >
              {/* Glow */}
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

              <div className="relative px-8 py-10">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                    {partner.title}
                  </p>

                  <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-44" />
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="mt-12 flex h-44 items-center justify-center"
                >
                  <Image
                    src={partner.logos[0]}
                    alt={partner.title}
                    width={240}
                    height={120}
                    className="max-h-24 w-auto object-contain transition duration-500"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= SUPPORTING PARTNER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="group relative mt-10 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_60px_rgba(212,175,55,0.15)]"
        >
          {/* Glow */}
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[150px]" />

          <div className="relative px-10 py-14 md:px-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
                Supporting Partner
              </p>

              <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-56" />
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-20 md:gap-28">
              {partners[3].logos.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.08,
                    y: -6,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-3xl opacity-0 transition duration-500 hover:opacity-100" />

                  <Image
                    src={logo}
                    alt="Supporting Partner"
                    width={260}
                    height={120}
                    className="relative max-h-24 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}