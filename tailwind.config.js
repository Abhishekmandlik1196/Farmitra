/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          primary: '#15803D', // Green - primary brand
          secondary: '#EAB308', // Yellow - harvest gold
          dark: '#1E293B',
          light: '#F0FDF4',
          earth: '#92400E', // Brown - soil
          warning: '#DC2626',
          info: '#0284C7',
          accent: '#F97316',
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
      },
      minHeight: {
        screen: ['100vh', '100dvh']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
