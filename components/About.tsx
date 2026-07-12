"use client";

import { useEffect, useRef } from "react";

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
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-forest-deep/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-5">
          <h2 className="font-display text-2xl md:text-4xl font-light bg-gradient-to-r from-[#FFF6D6] via-[#D4AF37] to-[#FFF2B2] bg-clip-text text-transparent mb-6">
            About The OAK Project
          </h2>

          {/* <div className="gold-rule max-w-48 mx-auto">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div> */}
        </div>

        {/* OAK Heading */}
        <section className="pb-14">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFF6D6] via-[#D4AF37] to-[#FFF2B2] bg-clip-text text-transparent mb-5">
              One Anointed Kingdom
            </h2>

            <p className="text-xl md:text-2xl font-semibold text-gold mb-4 tracking-wide">
              One Heart
              <span className="mx-3 text-gold/60">|</span>
              One Mission
              <span className="mx-3 text-gold/60">|</span>
              One King
            </p>

            <p className="text-lg md:text-xl text-[#D9C8A3] leading-relaxed">
              All{" "}
              <span className="font-semibold text-gold">Hearts</span> united as
              one, in a{" "}
              <span className="font-semibold text-gold">Mission</span> to lift
              up One <span className="font-semibold text-gold">King</span>{" "}
              forever.
            </p>
          </div>
        </section>

        {/* About Content */}
        <div className="reveal max-w-5xl mx-auto">
          <div className="space-y-8">
            <p className="text-[#D9C8A3] text-lg leading-9">
              The{" "}
              <span className="font-semibold text-gold">OAK Project</span> is a
              worship band—an instrumental and vocal ensemble committed to
              glorifying God through music. Our sound blends gospel, soul,
              indie, and contemporary influences, creating a worshipful and
              uplifting musical experience. Rooted in honest storytelling,
              unity, and faith, our music seeks to minister to hearts across
              cultures and generations.
            </p>

            <p className="text-[#D9C8A3] text-lg leading-9">
              Formed by a close-knit collective of musicians and creatives,
              <span className="font-semibold text-gold"> OAK </span>
              stands for
              <span className="font-semibold text-gold">
                {" "}
                One Anointed Kingdom
              </span>
              —a reflection of our calling to serve God with excellence and to
              use music as a vessel for His presence. As an
              instrumental-focused ensemble, we emphasize rich soundscapes,
              dynamic arrangements, and heartfelt melodies that create space for
              reflection, worship, and spiritual connection.
            </p>

            <p className="text-[#D9C8A3] text-lg leading-9">
              The{" "}
              <span className="font-semibold text-gold">OAK Project</span> is
              more than a band—it is an evolving musical ministry shaped by
              prayer, dedication, and creativity. Our vision is to build
              Christ-centered musical experiences that inspire faith, bring
              hope, and draw people closer to God.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}