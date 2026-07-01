"use client";

import { useEffect, useRef } from "react";

const events = [
  {
    icon: "💍",
    title: "Weddings",
    desc: "Create an unforgettable atmosphere for your most cherished day with live gospel and soul music.",
  },
  {
    icon: "⛪",
    title: "Church & Retreats",
    desc: "Spirit-filled worship sessions, prayer meetings, and church retreats elevated through live instrumental worship.",
  },
  {
    icon: "🎉",
    title: "Private Events",
    desc: "Get-togethers and private gatherings given a unique soundtrack of purpose and joy.",
  },
  {
    icon: "🎤",
    title: "Gospel Concerts",
    desc: "Full-scale gospel music concerts featuring original compositions and beloved worship favorites.",
  },
  {
    icon: "🏛️",
    title: "Conferences",
    desc: "Set the tone for your corporate or ministry conference with music that inspires unity.",
  },
  {
    icon: "✨",
    title: "Special Occasions",
    desc: "Anniversary celebrations, milestone events — any occasion deserving a musical memory.",
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative py-32 px-6 bg-forest-deep overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-20">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">
            Where We Perform
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-off-white mb-6">
            Every Occasion, <br />
            <span className="italic text-gold-gradient">Made Memorable</span>
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto text-base leading-relaxed">
            Let us make your special occasion truly memorable through music.
          </p>
          <div className="gold-rule max-w-48 mx-auto mt-6">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Events grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {events.map((e) => (
            <div
              key={e.title}
              className="glass rounded-md p-7 group hover:border-gold/30 hover:-translate-y-1 transition-all duration-400"
            >
              <span className="text-4xl mb-5 block">{e.icon}</span>
              <h3 className="font-display text-xl font-semibold text-off-white mb-3 group-hover:text-gold transition-colors">
                {e.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="reveal relative rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-mid to-forest-deep" />
          <div className="absolute inset-0 border border-gold/20 rounded-md" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(201,146,42,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10 py-14 px-10 text-center">
            <p className="font-display text-3xl md:text-4xl text-off-white font-light mb-4">
              Ready to add the sound of{" "}
              <span className="italic text-gold">something sacred</span>?
            </p>
            <p className="text-warm-gray mb-8 max-w-lg mx-auto">
              Reach out to book The OAK Project for your next event.
            </p>
            <a
              href="#contact"
              className="inline-block px-10 py-4 bg-gold text-ink font-medium text-sm tracking-widest uppercase hover:bg-gold-light transition-all duration-300 rounded-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
