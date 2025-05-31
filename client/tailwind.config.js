/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // 🔁 escanea TODO en src (incluye components)
  ],

  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
