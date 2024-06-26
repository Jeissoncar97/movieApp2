/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Añade esta línea
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "custom": "#2F6182",
        "custom-2": "#3D7DA8"
      }
    },
  },
  plugins: [],
}
