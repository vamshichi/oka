"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Events() {
  const eventDate = new Date("2026-11-14T18:00:00");

  const calculateTime = () => {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;

    return {
      days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
      hours: Math.max(
        0,
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ),
      minutes: Math.max(
        0,
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ),
      seconds: Math.max(
        0,
        Math.floor((distance % (1000 * 60)) / 1000)
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="events"
      className="relative py-32 px-6 bg-forest-deep overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-gold text-xl mb-4">
            Upcoming Event
          </p>

          <h2 className="font-display text-5xl md:text-6xl text-off-white font-light">
            Kingdom Alive
          </h2>

          <p className="text-warm-gray mt-5">
            Join us for a powerful evening of worship, music, and the presence
            of God.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Event Poster */}
          <div className="glass rounded-xl overflow-hidden border border-gold/20">
            <Image
              src="/images/kingdomAlive.jpeg"
              alt="Kingdom Alive"
              width={700}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Event Details */}
          <div>

            <p className="uppercase tracking-[0.3em] text-gold text-sm mb-3">
              Live Worship Event
            </p>

            <h3 className="font-display text-5xl text-off-white mb-6">
              November 14<sup>th</sup>
            </h3>

            <p className="text-warm-gray leading-relaxed mb-10">
              Experience an unforgettable night filled with worship, powerful
              music, prayer, and the presence of God. Come together as one
              family to celebrate His goodness.
            </p>

            {/* Countdown */}

            <div className="grid grid-cols-4 gap-4 mb-10">

              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass rounded-lg p-6 text-center border border-gold/20"
                >
                  <h4 className="text-4xl font-bold text-gold">
                    {String(item.value).padStart(2, "0")}
                  </h4>

                  <p className="text-xs uppercase tracking-widest text-warm-gray mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex px-10 py-4 bg-gold text-ink rounded-sm uppercase tracking-widest text-sm font-semibold hover:bg-gold-light transition"
            >
              Contact Us
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}