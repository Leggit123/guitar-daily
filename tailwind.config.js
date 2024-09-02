/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-cyan':'#00FFFD',
        // Ensure the default colors are still available
      },
    },
  },
  plugins: [],
};
