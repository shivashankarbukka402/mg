/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f9b8e',
          dark: '#0b7a70',
          light: '#e6f7f5',
        },
      },
    },
  },
  plugins: [],
}
