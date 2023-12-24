/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#bb86fc", 
          "primary-content": "#F6F0FD",
          "secondary": "#03dac6",
          "secondary-content": "#044A43",
          "accent": "#3700b3",
          "neutral": "#2d262f",
          // "base-100": "#03272c",
          "base-100": "#2C2B45",
          "info": "#007dff",
          "success": "#00f8a0",
          "warning": "#aa6e00",
          "error": "#cf6679",
        },
      },
    ],
  },
};