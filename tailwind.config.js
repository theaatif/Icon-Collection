/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dinta: ["Dinta", "sans-serif"],
        "dinta-bold": ["Dinta", "sans-serif"],
        "dinta-medium": ["Dinta", "sans-serif"],
        "dinta-black": ["Dinta", "sans-serif"],
      },
    },
  },
  plugins: [],
};
