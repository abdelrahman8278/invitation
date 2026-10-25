/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
        aref: ['var(--font-aref)', 'serif'],
        alexandria: ['var(--font-alexandria)', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  plugins: [],
}
