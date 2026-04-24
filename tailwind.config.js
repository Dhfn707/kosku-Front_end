/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#D97706", // Modern Orange
        "brand-brown": "#78350F", // Modern Brown
        "brand-beige": "#FFFBEB", // Light background
      },
    },
  },
  plugins: [],
};
