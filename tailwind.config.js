/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(1.85rem)' }, // translate-y-5 के बराबर
        },
      },
      animation: {
        'float-slow': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}