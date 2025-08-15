/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        teal: "rgb(var(--teal) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        orange: "rgb(var(--orange) / <alpha-value>)",
        coral: "rgb(var(--coral) / <alpha-value>)",
        primary: "rgb(var(--ink) / <alpha-value>)", // Le --ink est notre couleur primaire
        background: "#ffffff", // Fond blanc explicite
      },
    },
  },
  plugins: [],
}