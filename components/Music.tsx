"use client";

import { useEffect, useRef } from "react";

const genres = [
  { name: "Gospel", pct: 90 },
  { name: "Soul", pct: 80 },
  { name: "Indie", pct: 70 },
  { name: "Contemporary", pct: 75 },
  { name: "Carnatic Fusion", pct: 60 },
  { name: "Cinematic", pct: 65 },
];

const highlights = [
  {
    icon: "🎷",
    title: "Rich Soundscapes",
    desc: "Dynamic multi-layered arrangements spanning flute, violin, guitar, keys, and more.",
  },
  {
    icon: "🙏",
    title: "Faith-Rooted",
    desc: "Every note is crafted with purpose, anchored in the story of the gospel.",
  },
  {
    icon: "🌍",
    title: "Cross-Cultural",
    desc: "Indian classical roots woven into contemporary global styles to reach every heart.",
  },
  {
    icon: "🎬",
    title: "Cinematic Depth",
    desc: "Film-score sensibilities that transform live performances into immersive experiences.",
  },
];

export default function Music() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            // Animate bars
            const bars = e.target.querySelectorAll<HTMLElement>("[data-width]");
            bars.forEach((bar) => {
              const w = bar.getAttribute("data-width") || "0";
              setTimeout(() => {
                bar.style.width = `${w}%`;
              }, 200);
            });
          }
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
      id="music"
      ref={sectionRef}
      className="relative py-32 px-6 bg-ink overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-20">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">Our Sound</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-off-white mb-6">
            Where Genres Dissolve
          </h2>
          <div className="gold-rule max-w-48 mx-auto">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
        </div>

        <div className="reveal grid lg:grid-cols-2 gap-20 items-center">
          {/* Genre bars */}
          <div>
            <h3 className="font-display text-2xl text-off-white font-light mb-8">
              Genre Palette
            </h3>
            <div className="space-y-6">
              {genres.map((g) => (
                <div key={g.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-off-white tracking-wide">{g.name}</span>
                    <span className="text-gold">{g.pct}%</span>
                  </div>
                  <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-dim to-gold-light rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "0%" }}
                      data-width={g.pct}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-5">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="glass rounded-md p-6 hover:border-gold/30 transition-all duration-400 group"
              >
                <span className="text-3xl mb-4 block">{h.icon}</span>
                <h4 className="font-display text-lg text-off-white font-semibold mb-2 group-hover:text-gold transition-colors">
                  {h.title}
                </h4>
                <p className="text-warm-gray text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div className="reveal mt-24 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-5xl font-display mb-4">&ldquo;</p>
            <p className="font-display text-2xl md:text-3xl font-light text-off-white italic leading-relaxed">
              Rich soundscapes, dynamic arrangements, and heartfelt melodies
              that elevate every performance.
            </p>
            <p className="mt-6 text-warm-gray text-sm tracking-widest uppercase">
              — The OAK Project
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
