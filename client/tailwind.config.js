/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50:  '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        indigo: {
          50:  '#EEF2FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        emerald: {
          50:  '#ECFDF5',
          200: '#A7F3D0',
          500: '#10B981',
          600: '#059669',
        },
        amber: {
          50:  '#FFFBEB',
          200: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          700: '#D97706',
          800: '#92400E',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      boxShadow: {
        'glow-sky': '0 0 24px rgba(14, 165, 233, 0.35)',
        'glow-indigo': '0 0 24px rgba(99, 102, 241, 0.35)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-sky-indigo': 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
        'gradient-green-sky': 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)',
      }
    },
  },
  plugins: [],
}
