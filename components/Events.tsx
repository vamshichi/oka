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

          {/* <p className="text-warm-gray mt-5">
            Join us for a powerful evening of worship, music, and the presence
            of God.
          </p> */}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Event Poster */}
          <div className="glass rounded-lg overflow-hidden border border-gold/20">
            <Image
              src="/images/kingeventimage.png"
              alt="Kingdom Alive"
              width={700}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Event Details */}
          <div>

            <p className="uppercase tracking-[0.3em] text-gold text-sm mb-3">
              An unforgettable instrumental concert where music, energy, and creativity come alive.
            </p>

            <h3 className="font-display text-5xl text-off-white mb-4">
              November 14<sup>th</sup>
            </h3>
<div className="inline-flex items-center gap-4 mb-8 px-5 py-3 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm shadow-[0_0_25px_rgba(212,175,55,0.08)]">
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 border border-gold/30">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gold"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
      />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  </div>

  <div>
    <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-1">
      Venue
    </p>

    <p className="font-display text-lg md:text-xl text-off-white tracking-wide">
      SMPC International Worship Centre
    </p>
  </div>
</div>
            <p className="text-warm-gray leading-relaxed mb-10">
              Kingdom Alive is a gospel instrumental concert that brings together
              powerful music, creative expression, and united hearts to celebrate
              Jesus and inspire a generation to live boldly for His Kingdom.
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

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">

              <a
                href="/tickets"
                className="px-12 py-4 rounded-lg bg-[#D4AF37] text-black font-semibold uppercase tracking-[0.25em] transition duration-300 hover:bg-[#E5BF49] hover:scale-105"
              >
                Event Passes
              </a>

              <a
                href="#contact"
                className="px-12 py-4 rounded-lg border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[0.25em] transition duration-300 hover:bg-[#D4AF37] hover:text-black hover:scale-105"
              >
                Register as Sponsor
              </a>

              <a
                href="https://maps.app.goo.gl/WPC3n76YrmS9eHMu6?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-4 rounded-lg border border-[#D4AF37] text-[#D4AF37] uppercase tracking-[0.25em] transition duration-300 hover:bg-[#D4AF37] hover:text-black hover:scale-105"
              >
                View Location
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}