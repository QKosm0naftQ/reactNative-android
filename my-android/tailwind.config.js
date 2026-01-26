/** @type {import('tailwindcss').Config} */
module.exports = {
  // Переконайся, що тут є App.tsx та папка app, якщо вона з'явиться
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
