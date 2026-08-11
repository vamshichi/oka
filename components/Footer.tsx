
import Image from "next/image";
import { Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + Tagline */}
          <div>
            <div className="flex items-center gap-3">
              {/* Replace this with your actual logo if needed */}
              <div>
                <h2 className="text-xl font-semibold tracking-[0.2em] text-white">
                  THE OAK PROJECT
                </h2>

                <p
                  className="mt-2 text-gold text-xs"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  One Heart · One Mission · One King
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-warm-gray">
              A music collective creating meaningful musical experiences
              through concerts, events, worship, collaborations, and special
              occasions.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Legal
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="/terms"
                className="text-sm text-warm-gray transition-colors hover:text-gold"
              >
                Terms &amp; Conditions
              </a>

              <a
                href="/privacy"
                className="text-sm text-warm-gray transition-colors hover:text-gold"
              >
                Privacy Policy
              </a>

              <a
                href="/return-cancellation"
                className="text-sm text-warm-gray transition-colors hover:text-gold"
              >
               Cancellation Policy
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Connect With Us
            </h3>

            <div className="mt-5 flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/The.OAKProject"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/20 text-warm-gray transition-all hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@TheOAKProject.gospelband"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/20 text-warm-gray transition-all hover:border-gold hover:text-gold"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>

              {/* Email */}
              <a
                href="mailto:theoakproject.gospelband@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/20 text-warm-gray transition-all hover:border-gold hover:text-gold"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>

            <a
              href="mailto:theoakproject.gospelband@gmail.com"
              className="mt-5 block text-sm text-warm-gray transition-colors hover:text-gold"
            >
              Kalebu C
              theoakproject.gospelband@gmail.com
            </a>

            <a
              href="tel:+918277360316"
              className="mt-2 block text-sm text-warm-gray transition-colors hover:text-gold"
            >
              +91 8277360316
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gold/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            className="text-gold text-xs"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            One Heart · One Mission · One King
          </p>

          <p className="text-xs tracking-wider text-warm-gray/50">
            © {new Date().getFullYear()} The OAK Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
