import Image from "next/image";
import { Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-deep border-t border-gold/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/oaklogo.png"
              alt="The OAK Project"
              width={44}
              height={44}
              className="rounded-full opacity-80"
            />
            <div>
              <p className="font-display text-lg font-semibold text-off-white tracking-wide">
                THE OAK PROJECT
              </p>
              <p
                className="text-gold text-xs"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                One Heart · One Mission · One King
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/The.OAKProject"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-sm border border-gold/20 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://youtube.com/@TheOAKProject.gospelband"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-sm border border-gold/20 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a
              href="mailto:theoakproject.gospelband@gmail.com"
              className="w-9 h-9 rounded-sm border border-gold/20 flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-warm-gray/50 text-xs tracking-wider">
            © {new Date().getFullYear()} The OAK Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
