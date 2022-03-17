module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bgHeroHome": "url('/bgHeroHome.jpg')",
        "bgHeroHome2": "url('/bgHeroHome1.webp')",
        "bgHeroHome3": "url('/bgHeroHome2.webp')",

      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
