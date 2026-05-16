/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e1a',
        surface: '#111827',
        'surface-2': '#1f2937',
        purple: {
          DEFAULT: '#7c3aed',
          light: '#a855f7',
          dark: '#5b21b6',
        },
        gold: {
          DEFAULT: '#b8902a',
          light: '#d4a843',
          dark: '#8a6a1a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}

