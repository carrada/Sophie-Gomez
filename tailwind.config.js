/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "var(--brand-ink)",
          mute: "var(--brand-mute)",
          soft: "var(--brand-soft)",
          line: "var(--brand-line)",
          lineStrong: "var(--brand-line-strong)",
          paper: "var(--brand-paper)",
          subtitle: "var(--brand-subtitle)",
          graphite: "var(--brand-graphite)",
        },
      },
      fontFamily: {
        display: ["var(--font-marcellus)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      letterSpacing: {
        brand: "0.2em",
      },
    },
  },
  plugins: [],
};

module.exports = config;
