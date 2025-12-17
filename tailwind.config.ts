import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MH5 Brand Colors - Elite Performance Neon Theme
        'midnight': '#050505',
        'smoke': '#111111',
        'neon': '#7DF9FF',
        'ice': '#7DF9FF',
        'frost': '#9DFBFF',
        'diamond': '#BDFCFF',
        'crystal': '#7DF9FF',
        'offwhite': '#F5F5F5',
        'danger': '#FF4444',
        // Legacy gold reference for backward compatibility (maps to neon)
        'gold': '#7DF9FF',
      },
      fontFamily: {
        'heading': ['Oswald', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'accent': ['Oswald', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,1) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
