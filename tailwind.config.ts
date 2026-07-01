import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9922A",
          light: "#E8B84B",
          pale: "#F0D080",
        },
        forest: {
          DEFAULT: "#1E3A2F",
          deep: "#0F2019",
        },
        ink: "#080D0A",
        "off-white": "#F2EDE4",
        "warm-gray": "#B8B0A4",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Dancing Script", "cursive"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        // All keyframes live in globals.css for full control
        // Keep this section for any Tailwind-specific utilities
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.12)" },
        },
      },
      animation: {
        shimmer: "shimmer 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;