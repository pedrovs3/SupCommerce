/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Quicksand", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "450ms",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
