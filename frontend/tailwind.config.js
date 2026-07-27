/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand scale — used by existing Login/Signup/VerifyOTP forms
        brand: {
          50: "#EEF6F2",
          100: "#D6EBE0",
          200: "#AED7C1",
          300: "#7FBE9F",
          400: "#4C9E7C",
          500: "#1F7A5C",
          600: "#175F48",
          700: "#134C3A",
          800: "#0F3C2E",
          900: "#0B2F24",
        },
        // Deep ledger ink — near-black with a green undertone, used for dark sections
        ink: {
          DEFAULT: "#0D1714",
          50: "#F2F4F3",
          100: "#DADFDD",
          400: "#3A4A45",
          600: "#1A2622",
          800: "#101B18",
          900: "#0D1714",
        },
        // Warm paper background for light sections
        paper: {
          DEFAULT: "#F6F5F1",
          100: "#FBFAF8",
          200: "#EFEDE6",
        },
        // Ledger gold accent — stability / trust cue, used sparingly
        gold: {
          DEFAULT: "#C9A24B",
          300: "#E1C888",
          400: "#D4B468",
          500: "#C9A24B",
          600: "#A9843A",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(13,23,20,0.06), 0 8px 24px rgba(13,23,20,0.06)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(246,245,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(246,245,241,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
