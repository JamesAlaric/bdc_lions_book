/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bdc-red': '#f7323f',
        'bdc-yellow': '#ffc627',
        'bdc-black': '#1d1d1d',
        'off-white': '#fafafa',
        'folk-cream': '#FAF8F5',
        'folk-brown': '#5C4A3D',
        'folk-terracotta': '#C4704E',
        'folk-sage': '#8B9A7D',
        'folk-sand': '#E8E0D5',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
