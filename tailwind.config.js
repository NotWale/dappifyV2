module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  'fontawesome-svg-core': {
    'license': 'free'
  },
  theme: {
    extend: {
      colors: {
        activeColor: "var(--active-color)",
      },
      keyframes: {
        'colorChange': {
          'from': { filter: 'hue-rotate(0deg)' },
          'to': { filter: 'hue-rotate(360deg)' },
        },
        'dropbounce': {
          '0%, 50%': { transform: 'translateY(-50px) rotate(-4deg)' },
          '50%': { transform: 'translateY(15px) rotate(4deg)' },
        }
      },
      animation: {
        'back-change': 'colorChange 20s alternate infinite',
        'drop-bounce': 'dropbounce 0.5s ease-in-out 1',
      }
    },
  },
  plugins: [{
    tailwindcss: { config: './tailwindcss-config.js' },
  },]
};
