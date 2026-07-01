"use client";

import { useEffect, useRef } from "react";

const pillars = [
  {
    letter: "O",
    word: "One",
    sub: "Anointed",
    desc: "A unified spirit of purpose that runs through every note we play and every heart we serve.",
  },
  {
    letter: "A",
    word: "Anointed",
    sub: "Kingdom",
    desc: "Spirit-led artistry rooted in faith, shaping music that carries something deeper than sound.",
  },
  {
    letter: "K",
    word: "Kingdom",
    sub: "Together",
    desc: "Building an ever-growing community of musicians and listeners who believe music can change the world.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 bg-ink overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-forest-deep/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="reveal text-center mb-20">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">Our Story</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-off-white mb-6">
            More Than a Band
          </h2>
          <div className="gold-rule max-w-48 mx-auto">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* About copy */}
        <div className="reveal grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="font-display text-2xl md:text-3xl font-light text-off-white leading-relaxed mb-6 italic">
              &ldquo;An evolving musical journey that reflects dedication,
              creativity, and excellence.&rdquo;
            </p>
            <p className="text-warm-gray leading-relaxed mb-5 text-base">
              The OAK Project is an instrumental and vocal ensemble that blends
              soul, gospel, indie, and contemporary influences into a distinct
              musical experience. Rooted in honest storytelling and a spirit of
              unity, our music transcends genre boundaries.
            </p>
            <p className="text-warm-gray leading-relaxed text-base">
              Formed by a collective of close-knit musicians and creatives, OAK
              stands for <strong className="text-off-white">One Anointed Kingdom</strong> — a
              reflection of our commitment to purpose-driven artistry and
              meaningful connection through music.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { n: "6+", label: "Instruments" },
              { n: "300+", label: "Original Compositions" },
              { n: "10+", label: "Years Combined Experience" },
              { n: "∞", label: "Hearts Touched" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-md p-6 text-center">
                <p className="font-display text-4xl font-semibold text-gold mb-2">
                  {s.n}
                </p>
                <p className="text-warm-gray text-xs tracking-wider uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* OAK pillars */}
        <div className="reveal grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.letter}
              className="glass rounded-md p-8 group hover:border-gold/40 transition-all duration-500"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-6xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors duration-500 leading-none">
                  {p.letter}
                </span>
                <div>
                  <p className="font-display text-lg text-off-white font-semibold">
                    {p.word}
                  </p>
                  <p className="text-gold text-sm">{p.sub}</p>
                </div>
              </div>
              <p className="text-warm-gray text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
