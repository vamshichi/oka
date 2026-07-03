"use client";

import {
  FaRing,
  FaChurch,
  FaUsers,
  FaMicrophoneAlt,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

const services = [
  {
    icon: FaRing,
    title: "Weddings",
    description:
      "Curating a beautiful musical experience that celebrates love, commitment, and the beginning of a new journey.",
  },
  {
    icon: FaChurch,
    title: "Church & retreats",
    description:
      "Creating an atmosphere of worship, reflection, and spiritual renewal through heartfelt music.",
  },
  {
    icon: FaUsers,
    title: "Private Events",
    description:
      "Bringing refined live music that adds warmth, meaning, and elegance to every gathering.",
  },
  {
    icon: FaMicrophoneAlt,
    title: "Gospel Concerts",
    description:
      "Delivering impactful gospel music experiences that inspire faith, joy, and unity.",
  },
  {
    icon: FaHandshake,
    title: "Conferences",
    description:
      "Enhancing conferences with music that creates a welcoming, engaging, and memorable environment.",
  },
  {
    icon: FaStar,
    title: "Special Occasions",
    description:
      "Making life’s meaningful celebrations more memorable through purposeful and uplifting music.",
  },
];

export default function WhereWeServe() {
  return (
    <section className="py-24 bg-forest">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.25em] text-lg font-semibold mb-3">
            Where we serve
          </p>

          <h2 className="font-display text-5xl md:text-6xl font-bold text-off-white">
            Every Occasion made memorable
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="glass rounded-xl p-8 border border-gold/10 hover:border-gold/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <Icon className="text-2xl text-gold" />
                </div>

                <h3 className="text-2xl font-semibold text-off-white mb-4">
                  {service.title}
                </h3>

                <p className="text-warm-gray leading-8">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}