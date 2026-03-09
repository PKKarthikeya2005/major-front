/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#050505',
        'charcoal': '#0A0A0A',
        'gold-leaf': '#D4AF37',
        'soft-white': '#F5F5F5',
        'amber-glow': '#FFBF00',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'manrope': ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #BFB885 100%)',
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shine": "shine 3s linear infinite",
        "float": "float 8s ease-in-out infinite",
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "scale-in": "scaleIn 1.5s ease-out forwards",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(1.1)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        }
      }
    },
  },
  plugins: [],
}
