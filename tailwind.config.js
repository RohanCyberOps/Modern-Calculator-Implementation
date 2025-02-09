/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float-1': 'float 20s ease-in-out infinite',
        'float-2': 'float 25s ease-in-out infinite -5s',
        'float-3': 'float 22s ease-in-out infinite -10s',
        'float-4': 'float 28s ease-in-out infinite -15s',
        'float-5': 'float 24s ease-in-out infinite -20s',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(50px, -50px) rotate(90deg)',
          },
          '50%': {
            transform: 'translate(-20px, 60px) rotate(180deg)',
          },
          '75%': {
            transform: 'translate(-40px, -40px) rotate(270deg)',
          }
        }
      }
    },
  },
  plugins: [],
};