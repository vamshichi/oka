"use client";

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
      className="relative overflow-hidden py-28 lg:py-36"
      style={{
        backgroundImage: "url('/images/kingeventimage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/35" /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ================= MAIN LAYOUT ================= */}
        <div className="grid lg:grid-cols-[420px_1fr_420px] gap-8 items-center min-h-[650px]">

          {/* ================= LEFT SIDE ================= */}

          <div className="flex items-center h-full">

            <div>

              <p className="text-white text-lg leading-10 w-full max-w-[400px]">
                Kingdom Alive is a gospel instrumental concert that brings
                together powerful music, creative expression, and united hearts
                to celebrate Jesus and inspire a generation to live boldly for
                His Kingdom.
              </p>

            </div>

          </div>

          {/* ================= CENTER ================= */}
          {/* Leave empty because the logo is already in the background image */}

          <div />

          {/* ================= RIGHT SIDE ================= */}

          <div className="flex justify-end">

            <div className="grid grid-cols-2 gap-5 w-full max-w-[300px]">

              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="h-36 rounded-2xl bg-black/50 backdrop-blur-xl border border-[#D4AF37]/25 flex flex-col justify-center transition hover:border-[#D4AF37]"
                >
                  <h3 className="text-center text-5xl font-bold text-[#D4AF37]">
                    {String(item.value).padStart(2, "0")}
                  </h3>

                  <p className="mt-3 text-center uppercase tracking-[0.35em] text-xs text-white/70">
                    {item.label}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">

          <a
            // href="#event"
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

        </div>

      </div>
    </section>
  );
}