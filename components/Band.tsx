"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const members = [
  {
    name: "Kaleb",
    role: "Drummer & Percussionist",
    instrument: "Drums · Percussion",
    image: "/images/kaleb.png",
    bio: "A Bangalore-based drummer and instructor with over a decade of stage and studio experience. Co-founder of The OAK Project, Kaleb's drumming journey began in the church, deeply shaped by the power of gospel music.",
    tag: "Co-Founder",
  },
  {
    name: "Joe Kingsly",
    role: "Multi-Instrumentalist",
    instrument: "Keys · Ghatam · More",
    image: "/images/joe.png",
    bio: "A South India–based multi-instrumentalist and recording engineer for South Indian films. Trained in Carnatic percussion under maestro Giridhar Udupa, Joe blends talent, faith, and love for music.",
    tag: "Key Player",
  },
  {
    name: "Jim Prince",
    role: "Multi-Instrumentalist",
    instrument: "Piano · Guitar · Bass",
    image: "/images/jim.png",
    bio: "A dynamic producer whose musical journey spans over a decade. With 300+ original productions across pop, rock, classical, folk, and electronic genres — from film scores to global fusion projects.",
    tag: "Producer",
  },
  {
    name: "Churchill",
    role: "Wind Instrumentalist",
    instrument: "Flute · Saxophone · Violin",
    image: "/images/churchill.png",
    bio: "A gifted wind instrumentalist whose expressive voice on the flute and saxophone has defined indie recordings and film scores. Rooted in Indian classical yet open to global styles.",
    tag: "Soloist",
  },
  {
    name: "Abhishek Kingsley",
    role: "Guitarist",
    instrument: "Guitar",
    image: "/images/abhishek.png",
    bio: "A dedicated guitarist whose love for music began inspired by gospel and worship. From church to college fests and weddings, Abhishek weaves faith and artistry into music that uplifts and unites.",
    tag: "Guitarist",
  },
];

export default function Band() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

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
      id="band"
      ref={sectionRef}
      className="relative py-32 px-6 bg-forest-deep overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(201,146,42,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-20">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">The Kingdom Musicians</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-off-white mb-6">
            Faces Behind the Sound
          </h2>
          <div className="gold-rule max-w-48 mx-auto">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Members grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <div
              key={m.name}
              className="member-card glass rounded-md overflow-hidden cursor-pointer group"
              onClick={() => setActive(active === i ? null : i)}
            >
              {/* Image container */}
              <div className="relative h-72 bg-ink overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />

                {/* Tag badge */}
                {/* <div className="absolute top-4 right-4 px-3 py-1 bg-gold/90 text-ink text-xs font-medium tracking-wider uppercase rounded-sm">
                  {m.tag}
                </div> */}

                {/* Instrument chips at bottom */}
                {/* <div className="absolute bottom-4 left-4">
                  <p className="text-gold text-xs tracking-widest uppercase">
                    {m.instrument}
                  </p>
                </div> */}
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-off-white mb-1">
                  {m.name}
                </h3>
                <p className="text-gold text-sm tracking-wide mb-4">{m.role}</p>

                {/* Expandable bio */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    active === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-warm-gray text-sm leading-relaxed">{m.bio}</p>
                </div>

                {/* <button className="mt-3 text-gold/60 hover:text-gold text-xs tracking-widest uppercase transition-colors flex items-center gap-1">
                  {active === i ? "Less" : "Read More"}
                  <span className={`transition-transform duration-300 ${active === i ? "rotate-180" : ""}`}>
                    ↓
                  </span>
                </button> */}
              </div>
            </div>
          ))}

          {/* Ashwin - violinist (no photo provided, decorative card) */}
          {/* <div className="member-card glass rounded-md overflow-hidden group">
            <div className="relative h-72 bg-gradient-to-br from-forest to-ink flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <p className="font-display text-7xl text-gold/20 mb-3">♩</p>
                <p className="text-warm-gray text-sm">Violinist</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-gold/90 text-ink text-xs font-medium tracking-wider uppercase rounded-sm">
                Violinist
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-gold text-xs tracking-widest uppercase">Violin</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold text-off-white mb-1">Ashwin</h3>
              <p className="text-gold text-sm tracking-wide mb-4">Violinist</p>
              <p className="text-warm-gray text-sm leading-relaxed">
                A passionate violinist whose music blends technical mastery with heartfelt expression. Trained in both classical and contemporary styles, Ashwin's unique artistry transforms each performance into a moving experience.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
