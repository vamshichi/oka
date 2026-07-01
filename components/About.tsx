"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const pillars = [
  {
    letter: "O",
    word: "One Heart",
    sub: "United in Love",
    desc: "All hearts united as one, worshipping together with humility, faith, and a shared desire to glorify God.",
  },
  {
    letter: "A",
    word: "One Mission",
    sub: "Purpose in Christ",
    desc: "United in a mission to lift up the name of Jesus through music, inspiring faith, hope, and worship in every heart.",
  },
  {
    letter: "K",
    word: "One King",
    sub: "Jesus Christ",
    desc: "Serving one King forever—Jesus Christ. Every song, every note, and every moment exists to honor His Kingdom and His glory.",
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
          {/* <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">Our Story</p> */}
          <h2 className="font-display text-5xl md:text-6xl font-light text-off-white mb-6">
            About The OAK Project
          </h2>
          <div className="gold-rule max-w-48 mx-auto">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* About copy */}
        <div className="reveal grid md:grid-cols-2 gap-16 items-center mb-24">
  {/* Left Content */}
  <div>
    <p className="font-display text-2xl md:text-3xl font-light text-off-white leading-relaxed mb-6 italic">
      &ldquo;An evolving musical ministry dedicated to glorifying God through
      excellence, worship, and creativity.&rdquo;
    </p>

    <p className="text-warm-gray leading-relaxed mb-5 text-base">
      The OAK Project is a worship band—an instrumental and vocal ensemble
      committed to glorifying God through music. Our sound blends gospel,
      soul, indie, and contemporary influences, creating a worshipful and
      uplifting musical experience. Rooted in faith, honest storytelling,
      and unity, our music seeks to minister to hearts across cultures and
      generations.
    </p>

    <p className="text-warm-gray leading-relaxed mb-5 text-base">
      Formed by a close-knit collective of musicians and creatives,
      <strong className="text-off-white"> One Anointed Kingdom (OAK)</strong>
      reflects our calling to serve God with excellence and use music as a
      vessel for His presence. Through rich instrumental soundscapes,
      dynamic arrangements, and heartfelt melodies, we create space for
      worship, reflection, and spiritual connection.
    </p>

    <p className="text-warm-gray leading-relaxed text-base">
      The OAK Project is more than a band—it is an evolving musical ministry
      shaped by prayer, dedication, and creativity. Our vision is to create
      Christ-centered musical experiences that inspire faith, bring hope,
      and draw people closer to God.
    </p>
  </div>

  {/* Right Image */}
  <div className="flex justify-center">
    <Image
      src="/images/about-image.png" // Replace with your image path
      alt="The OAK Project Worship Band"
      width={550}
      height={650}
      className="rounded-2xl object-cover shadow-2xl"
    />
  </div>
</div>

        {/* OAK pillars */}
        <div className="text-center mb-12 reveal">
  <h2 className="font-display text-4xl md:text-5xl text-off-white mb-3">
    OAK
  </h2>
  <p className="text-gold text-xl md:text-2xl tracking-[0.2em] uppercase">
    One Anointed Kingdom
  </p>
</div>
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
