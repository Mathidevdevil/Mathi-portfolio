/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: '#00f3ff',
        neon: '#00ff41',
        dark: '#0a0a0a',
        darker: '#050505',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        cyber: ['"Orbitron"', 'sans-serif'],
        fauna: ['"Fauna One"', 'serif'],
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
