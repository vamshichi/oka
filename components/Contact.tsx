"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  eventType: "",
  message: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Enquiry sent successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        message: "",
      });
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }

  setLoading(false);
};

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
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 bg-ink overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-20">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">Get In Touch</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-off-white mb-6">
            Let&apos;s Create <br />
            <span className="italic text-gold-gradient">Something Beautiful</span>
          </h2>
          <div className="gold-rule max-w-48 mx-auto">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
        </div>

        <div className="reveal grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div>
            <div className="flex justify-center lg:justify-start mb-8">
              <Image
                src="/images/oaklogo.png"
                alt="The OAK Project"
                width={80}
                height={80}
                className="rounded-full gold-glow"
              />
            </div>
            <p className="font-display text-2xl text-off-white font-light mb-2">
              Bookings &amp; Enquiries
            </p>

            <div className="space-y-4 mb-10">
              <a
                href="tel:+918277360316"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-sm border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-warm-gray tracking-widest uppercase mb-0.5">
                    Phone
                  </p>
                  <p className="text-off-white group-hover:text-gold transition-colors">
                    +91 8277360316
                  </p>
                </div>
              </a>

              <a
                href="mailto:theoakproject.gospelband@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-sm border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs text-warm-gray tracking-widest uppercase mb-0.5">
                    Email
                  </p>
                  <p className="text-off-white group-hover:text-gold transition-colors text-sm">
                    theoakproject.gospelband@gmail.com
                  </p>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div>
              <p className="text-warm-gray text-xs tracking-widest uppercase mb-5">
                Follow the Journey
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/The.OAKProject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 glass rounded-sm hover:border-gold/40 hover:text-gold transition-all duration-300 group"
                >
                  <Instagram size={18} className="text-gold" />
                  <span className="text-sm text-warm-gray group-hover:text-off-white transition-colors">
                    @The.OAKProject
                  </span>
                </a>
                <a
                  href="https://youtube.com/@TheOAKProject.gospelband"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 glass rounded-sm hover:border-gold/40 hover:text-gold transition-all duration-300 group"
                >
                  <Youtube size={18} className="text-gold" />
                  <span className="text-sm text-warm-gray group-hover:text-off-white transition-colors">
                    YouTube
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Message form */}
          {/* Message Form */}
<div className="glass rounded-md p-8">
  <h3 className="font-display text-2xl text-off-white font-light mb-6">
    Send a Message
  </h3>

  <form onSubmit={handleSubmit} className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <label className="block text-xs text-warm-gray tracking-widest uppercase mb-2">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-off-white text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs text-warm-gray tracking-widest uppercase mb-2">
          Phone
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 xxxxx xxxxx"
          required
          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-off-white text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
        />
      </div>
    </div>

    {/* Email */}
    <div>
      <label className="block text-xs text-warm-gray tracking-widest uppercase mb-2">
        Email
      </label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        required
        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-off-white text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
      />
    </div>

    {/* Event Type */}
    <div>
      <label className="block text-xs text-warm-gray tracking-widest uppercase mb-2">
        Event Type
      </label>

      <select
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        required
        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-off-white text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none"
      >
        <option value="" className="bg-ink">
          Select Event Type
        </option>

        <option value="Wedding" className="bg-ink">
          Wedding
        </option>

        <option value="Church / Retreat" className="bg-ink">
          Church / Retreat
        </option>

        <option value="Gospel Concert" className="bg-ink">
          Gospel Concert
        </option>

        <option value="Private Event" className="bg-ink">
          Private Event
        </option>

        <option value="Conference" className="bg-ink">
          Conference
        </option>

        <option value="Other" className="bg-ink">
          Other
        </option>
      </select>
    </div>

    {/* Message */}
    <div>
      <label className="block text-xs text-warm-gray tracking-widest uppercase mb-2">
        Message
      </label>

      <textarea
        rows={5}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Tell us about your event..."
        required
        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-off-white text-sm placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors resize-none"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-4 rounded-sm font-medium tracking-widest uppercase transition-all duration-300 ${
        loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-gold text-ink hover:bg-gold-light"
      }`}
    >
      {loading ? "Sending..." : "Send Enquiry"}
    </button>
  </form>
</div>
        </div>
      </div>
    </section>
  );
}
