"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";


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
        <div className="reveal grid md:grid-cols-1 gap-16 items-center mb-24">
  {/* Left Content */}
  <div>
  {/* <p className="font-display text-2xl md:text-3xl font-light text-off-white leading-relaxed mb-6 italic">
    &ldquo;The OAK Project is more than a band; it is an evolving musical ministry shaped by prayer, dedication, and creativity.&rdquo;
  </p> */}

  <p className="text-warm-gray leading-relaxed mb-5 text-base">
    The OAK Project, a worship band—an instrumental and vocal ensemble
    committed to glorifying God through music. Our sound blends gospel,
    soul, indie, and contemporary influences, creating a worshipful and
    uplifting musical experience. Rooted in honest storytelling, unity,
    and faith, our music seeks to minister to hearts across cultures and
    generations.
  </p>

  <p className="text-warm-gray leading-relaxed mb-5 text-base">
    Formed by a close-knit collective of musicians and creatives,
    <strong className="text-off-white"> OAK</strong> stands for
    <strong className="text-off-white"> One Anointed Kingdom</strong>—a
    reflection of our calling to serve God with excellence and to use
    music as a vessel for His presence. As an instrumental-focused
    ensemble, we emphasize rich soundscapes, dynamic arrangements, and
    heartfelt melodies that create space for reflection, worship, and
    spiritual connection.
  </p>

  <p className="text-warm-gray leading-relaxed text-base">
    The OAK Project is more than a band; it is an evolving musical ministry
    shaped by prayer, dedication, and creativity. Our vision is to build
    Christ-centered musical experiences that inspire faith, bring hope,
    and draw people closer to God.
  </p>
</div>
  {/* Right Image */}
  {/* <div className="flex justify-center">
    <Image
      src="/images/about-image.png" // Replace with your image path
      alt="The OAK Project Worship Band"
      width={550}
      height={650}
      className="rounded-2xl object-cover shadow-2xl"
    />
  </div> */}
</div>

        {/* OAK pillars */}
       {/* OAK Section */}
<section className="py-20">
  <div className="max-w-4xl mx-auto text-center px-6">
    <h2 className="text-5xl md:text-6xl font-bold text-off-white mb-4">
      One Anointed Kingdom
    </h2>

    <p className="text-xl md:text-2xl font-semibold text-off-white mb-2">
      One Heart <span className="mx-2">|</span> One Mission{" "}
      <span className="mx-2">|</span> One King
    </p>

    <p className="text-lg md:text-xl text-warm-gray">
      All <span className="font-semibold text-off-white">Hearts</span> united
      as one, In a <span className="font-semibold text-off-white">Mission</span>{" "}
      to lift up, One <span className="font-semibold text-off-white">King</span>{" "}
      forever
    </p>
  </div>
</section>
      </div>
    </section>
  );
}
