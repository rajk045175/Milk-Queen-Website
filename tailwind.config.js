/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#146B3A',
          dark: '#064E32',
          light: '#EAF5EC',
          cream: '#F8F7EF',
          text: '#252525',
          amber: '#F59E0B',
          muted: '#6B7280',
          border: '#E5E7EB',
          accent: '#10B981',
          surface: '#FDFCF7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(20, 107, 58, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(20, 107, 58, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'subtle': '0 1px 3px rgba(0,0,0,0.05)'
      }
    },
  },
  plugins: [],
}
