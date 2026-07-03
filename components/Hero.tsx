"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                PARTICLES                                   */
/* -------------------------------------------------------------------------- */

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 13) % 100).toFixed(2),
  top: ((i * 53 + 7) % 100).toFixed(2),
  duration: 5 + (i % 8),
  delay: (i * 0.35) % 6,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  opacity: i % 3 === 0 ? 0.7 : 0.35,
}));

/* -------------------------------------------------------------------------- */
/*                                LIGHT RAYS                                  */
/* -------------------------------------------------------------------------- */

const RAYS = [
  { rotate: -34, width: 220, left: "38%" },
  { rotate: -20, width: 180, left: "44%" },
  { rotate: -8, width: 160, left: "47%" },
  { rotate: 0, width: 260, left: "50%" },
  { rotate: 8, width: 160, left: "53%" },
  { rotate: 20, width: 180, left: "56%" },
  { rotate: 34, width: 220, left: "62%" },
];

/* -------------------------------------------------------------------------- */
/*                               ANIMATIONS                                   */
/* -------------------------------------------------------------------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.45,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const logoVariant = {
  hidden: {
    opacity: 0,
    scale: 0.82,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rayVariant = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: (i: number) => ({
    opacity: [0, 0.15, 0.06],
    scaleY: 1,
    transition: {
      duration: 2.4,
      delay: 0.6 + i * 0.15,
      ease: "easeOut",
    },
  }),
};

/* -------------------------------------------------------------------------- */
/*                              HERO COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const [mounted, setMounted] = useState(false);

  /* ---------------------------- Mouse Parallax ---------------------------- */

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, {
    stiffness: 70,
    damping: 22,
  });

  const springY = useSpring(rawY, {
    stiffness: 70,
    damping: 22,
  });

  /* ---------------------------- Background ---------------------------- */

  const bgX = useTransform(springX, [-1, 1], [-18, 18]);
  const bgY = useTransform(springY, [-1, 1], [-12, 12]);

  /* ------------------------------ Mid Layer ------------------------------ */

  const midX = useTransform(springX, [-1, 1], [-8, 8]);
  const midY = useTransform(springY, [-1, 1], [-6, 6]);

  /* ---------------------------- Spotlight ---------------------------- */

  const spotX = useTransform(springX, [-1, 1], [-30, 30]);
  const spotY = useTransform(springY, [-1, 1], [-20, 20]);

  /* ---------------------------- Mouse Events ---------------------------- */

  useEffect(() => {
    setMounted(true);

    const el = heroRef.current;

    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);

      rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [rawX, rawY]);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Hero Section"
      className="relative flex h-screen min-h-[900px] w-full items-center justify-center overflow-hidden bg-ink"
    >
            {/* -------------------------------------------------------------------------- */}
      {/*                           PARALLAX BACKGROUND                               */}
      {/* -------------------------------------------------------------------------- */}

      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          x: bgX,
          y: bgY,
        }}
      >
        <Image
          src="/images/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </motion.div>

      {/* -------------------------------------------------------------------------- */}
      {/*                              DARK OVERLAY                                  */}
      {/* -------------------------------------------------------------------------- */}

      <div className="absolute inset-0 bg-black/70" />

      {/* -------------------------------------------------------------------------- */}
      {/*                                VIGNETTE                                    */}
      {/* -------------------------------------------------------------------------- */}

      <div className="oak-vignette absolute inset-0 pointer-events-none" />

      {/* -------------------------------------------------------------------------- */}
      {/*                              GOLD HALO                                     */}
      {/* -------------------------------------------------------------------------- */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[180px]
          pointer-events-none
        "
      />

      {/* -------------------------------------------------------------------------- */}
      {/*                           MOUSE SPOTLIGHT                                  */}
      {/* -------------------------------------------------------------------------- */}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: spotX,
          y: spotY,
        }}
      >
        <div className="oak-spotlight" />
      </motion.div>

      {/* -------------------------------------------------------------------------- */}
      {/*                                LIGHT RAYS                                  */}
      {/* -------------------------------------------------------------------------- */}

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {RAYS.map((ray, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={rayVariant}
            initial="hidden"
            animate="visible"
            className="absolute top-0 h-[120vh] origin-top"
            style={{
              left: ray.left,
              width: ray.width,
              rotate: ray.rotate,
              background:
                "linear-gradient(to bottom, rgba(212,175,55,0.22), rgba(212,175,55,0.06), transparent)",
              filter: "blur(32px)",
            }}
          />
        ))}
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/*                            MID PARALLAX LAYER                              */}
      {/* -------------------------------------------------------------------------- */}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: midX,
          y: midY,
        }}
      >
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_65%)]
          "
        />
      </motion.div>

      {/* -------------------------------------------------------------------------- */}
      {/*                              GRID OVERLAY                                  */}
      {/* -------------------------------------------------------------------------- */}

      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,.05) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* -------------------------------------------------------------------------- */}
      {/*                            TOP GRADIENT                                    */}
      {/* -------------------------------------------------------------------------- */}

      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* -------------------------------------------------------------------------- */}
      {/*                           BOTTOM FADE                                      */}
      {/* -------------------------------------------------------------------------- */}

      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* -------------------------------------------------------------------------- */}
      {/*                           FLOATING PARTICLES                               */}
      {/* -------------------------------------------------------------------------- */}

      <AnimatePresence>
        {mounted &&
          PARTICLES.map((particle) => (
            <motion.div
              key={particle.id}
              className="oak-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
              }}
              animate={{
                y: [0, -24, 0],
                opacity: [
                  particle.opacity * 0.3,
                  particle.opacity,
                  particle.opacity * 0.3,
                ],
                scale: [0.8, 1.35, 0.8],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </AnimatePresence>

      {/* -------------------------------------------------------------------------- */}
      {/*                         CONTENT STARTS BELOW                               */}
      {/* -------------------------------------------------------------------------- */}
            {/* -------------------------------------------------------------------------- */}
      {/*                              HERO CONTENT                                  */}
      {/* -------------------------------------------------------------------------- */}

      <motion.div
        className="
          relative
          z-20
          mx-auto
          flex
          h-full
          w-full
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-6
          text-center
          lg:px-10
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ---------------------------------------------------------------------- */}
        {/*                               TITLE                                    */}
        {/* ---------------------------------------------------------------------- */}

        <motion.div variants={fadeUp} className="space-y-4">

          <motion.h2
            variants={fadeIn}
            className="
              font-display
              uppercase
              tracking-[0.7em]
              text-white/80
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
            "
          >
            THE
          </motion.h2>

          <motion.h1
            variants={logoVariant}
            className="
              font-display
              font-black
              uppercase
              leading-none
              tracking-[0.08em]
              text-[5rem]
              sm:text-[6rem]
              md:text-[8rem]
              lg:text-[10rem]
              xl:text-[12rem]
            "
          >
            <span
              className="
                bg-gradient-to-b
                from-[#FFF8D9]
                via-[#D4AF37]
                to-[#8A6110]
                bg-clip-text
                text-transparent
                drop-shadow-[0_10px_45px_rgba(212,175,55,.35)]
              "
            >
              OAK
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeIn}
            className="
              font-display
              font-light
              uppercase
              tracking-[0.55em]
              text-white
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            PROJECT
          </motion.h2>

        </motion.div>

        {/* ---------------------------------------------------------------------- */}
        {/*                              TAGLINE                                   */}
        {/* ---------------------------------------------------------------------- */}

        <motion.p
  variants={fadeIn}
  className="
    mt-10
    max-w-2xl
    text-center
    text-2xl
    tracking-normal
    text-[#D4AF37]
    md:text-4xl
    font-normal
    [font-family:var(--font-great-vibes)]
  "
>
  One Heart • One Mission • One King
</motion.p>

        {/* ---------------------------------------------------------------------- */}
        {/*                               DIVIDER                                  */}
        {/* ---------------------------------------------------------------------- */}

        <motion.div
          variants={fadeIn}
          className="my-10 flex items-center gap-6"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="h-3 w-3 rounded-full bg-[#D4AF37] shadow-[0_0_28px_rgba(212,175,55,.9)]" />

          <div className="h-px w-24 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* ---------------------------------------------------------------------- */}
        {/*                              SCRIPTURE                                 */}
        {/* ---------------------------------------------------------------------- */}

        {/* <motion.div
          variants={fadeIn}
          className="space-y-5"
        >
          <blockquote
            className="
              mx-auto
              max-w-3xl
              text-center
              italic
              leading-relaxed
              text-white/85
              text-lg
              md:text-xl
              lg:text-2xl
            "
          >
            “Let everything that has breath praise the Lord.”
          </blockquote>

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-[#D4AF37]
              text-xs
              md:text-sm
            "
          >
            Psalm 150:6
          </p>
        </motion.div> */}

        {/* ---------------------------------------------------------------------- */}
        {/*                               BUTTONS                                  */}
        {/* ---------------------------------------------------------------------- */}

        {/* <motion.div
          variants={fadeUp}
          className="
            mt-14
            flex
            flex-col
            gap-5
            sm:flex-row
          "
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              rounded-full
              bg-[#D4AF37]
              px-10
              py-4
              font-semibold
              tracking-[0.18em]
              uppercase
              text-black
              shadow-[0_10px_40px_rgba(212,175,55,.35)]
              transition-all
            "
          >
            Join The Mission
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-[#D4AF37]/40
              bg-white/5
              px-10
              py-4
              uppercase
              tracking-[0.18em]
              text-white
              backdrop-blur-md
            "
          >
            <Play size={18} />

            Watch Vision
          </motion.button>
        </motion.div> */}
      </motion.div>

      
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="
          absolute
          bottom-8
          left-1/2
          z-30
          -translate-x-1/2
        "
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex
            flex-col
            items-center
            gap-2
            text-[#D4AF37]
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.35em]
            "
          >
            Scroll
          </span>

          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div> */}

    </section>

  )
}