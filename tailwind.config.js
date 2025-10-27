/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- Perfect
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#6366F1",
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(145deg, rgba(30,30,32,0.9), rgba(18,18,19,0.9))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
