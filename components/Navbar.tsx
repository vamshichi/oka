"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#band", label: "The Band" },
  // { href: "#music", label: "Music" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-gold/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <Image
            src="/images/oaklogo.png"
            alt="The OAK Project"
            width={52}
            height={52}
            className="rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          {/* <div className="hidden sm:block">
            <p className="font-display text-xl font-semibold text-off-white leading-none tracking-wide">
              THE OAK PROJECT
            </p>
            <p className="text-xs text-gold tracking-[0.2em] uppercase mt-0.5">
              Gospel Instrumental Band
            </p>
          </div> */}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-warm-gray hover:text-off-white text-sm tracking-wider uppercase transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-5 py-2 border border-gold text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-ink transition-all duration-300 rounded-sm"
          >
            Book Us
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-off-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-forest-deep/95 backdrop-blur-md border-t border-gold/10 py-6 px-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-warm-gray hover:text-gold border-b border-white/5 text-sm tracking-widest uppercase transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 block text-center py-3 border border-gold text-gold text-sm tracking-wider uppercase"
          >
            Book Us
          </a>
        </div>
      )}
    </nav>
  );
}
