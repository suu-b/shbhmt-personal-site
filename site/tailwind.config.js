/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(red|blue|green|yellow|gray|black|pink|purple|orange|white|teal)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      animation: { bounce: 'bounce 2.5s infinite', },
    },
  },
  plugins: [],
};
