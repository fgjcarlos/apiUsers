module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgHeroHome: "url('/bgHeroHome.jpg')",
        bgHeroHome2: "url('/bgHeroHome1.webp')",
        bgHeroHome3: "url('/bgHeroHome2.webp')",
      },
      fontFamily: {
        bevan: ["BEVAN", "sans-serif"],
        moonRocks: ['Rubik Moonrocks', 'cursive']
      },
      display: ["group-hover"],

    },
    keyframes: {
      appearBelow: {
        '0%': { transform: 'h-[0%]' },
        '10%': { transform: 'h-[15%]]' },
        '20%': { transform: 'h-[20%]' },
        '30%': { transform: 'h-[30%]' },
        '40%': { transform: 'h-[40%]' },
        '50%': { transform: 'h-[55%]' },
        '60%': { transform: 'h-[70%])' },
        '100%': { transform: 'h-[100%]' },
      }
    },
    animation: {
      'appear-below': 'appearBelow 2s ease-in-out',
    },
    transitionProperty: {
      'height': 'height'
    }
    
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
