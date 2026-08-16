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
          ink: "#1C1917",
          mute: "#78716C",
          soft: "#A8A29E",
          line: "#D6D3D1",
          lineStrong: "#44403C",
          paper: "#FAFAF9",
          subtitle: "#4A4A4A",
          graphite: "#0C0A09",
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
