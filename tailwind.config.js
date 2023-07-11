/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '140': '36rem',
      }
    }
  },
  plugins: [],
}