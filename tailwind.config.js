/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs primaires BDC (Palette officielle)
        'bdc-red': '#F7323F',      // Strawberry Red
        'bdc-yellow': '#FFC627',   // School Bus Yellow
        'bdc-black': '#1D1D1D',    // Carbon Black
        'bdc-blue': '#1982C4',     // Steel Blue
        'bdc-white': '#FDFDFF',    // White

        // Neutres
        'platinum': '#F1F1F1',
        'off-white': '#FDFDFF',    // Mise à jour vers le blanc officiel
        'carbon': '#1D1D1D',
        'slate': '#4A4A4A',
        'muted': '#6B7280',

        // Accent Steel Blue (remplace teal)
        'steel-blue': {
          50: '#E8F2F8',
          100: '#D1E5F1',
          200: '#A3CBE3',
          300: '#5BA3CC',
          400: '#2B91C0',
          DEFAULT: '#1982C4',
          600: '#146A9F',
          700: '#0F5279',
          800: '#0A3A53',
          900: '#05222D',
        },
        // Alias teal → steel-blue pour compatibilité
        'teal': {
          50: '#E8F2F8',
          100: '#D1E5F1',
          200: '#A3CBE3',
          300: '#5BA3CC',
          400: '#2B91C0',
          DEFAULT: '#1982C4',
          600: '#146A9F',
          700: '#0F5279',
          800: '#0A3A53',
          900: '#05222D',
        },

        // Couleurs sémantiques
        'success': '#22C55E',
        'warning': '#FFC627',
        'error': '#F7323F',

        // Legacy (pour compatibilité)
        'folk-cream': '#FDFDFF',
        'folk-brown': '#1D1D1D',
        'folk-terracotta': '#1982C4',
        'folk-sage': '#1982C4',
        'folk-sand': '#F1F1F1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Work Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'soft-rise': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'slideUp': {
          '0%': { transform: 'translateX(-50%) translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateX(-50%) translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'soft-rise': 'soft-rise 0.55s ease-out both',
        'soft-fade': 'soft-fade 0.4s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'slide-up': 'slide-up 0.4s ease-out both',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.35s ease-out both',
        'slide-in-right': 'slide-in-right 0.35s ease-out both',
        'slide-in-left': 'slide-in-left 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
