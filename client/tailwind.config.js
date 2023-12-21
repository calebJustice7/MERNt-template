/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00c4ff", 
          "secondary": "#00ab00",
          "accent": "#a33e00",
          "neutral": "#2d262f",
          // "base-100": "#03272c",
          "base-100": "#19182b",
          "info": "#007dff",
          "success": "#00f8a0",
          "warning": "#aa6e00",
          "error": "#ff7796",
        },
      },
    ],
  },
};