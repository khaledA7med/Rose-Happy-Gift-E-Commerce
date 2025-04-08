/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      container: {
        center: true, // This makes the container always centered
        padding: '1rem', // Adds default padding
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
