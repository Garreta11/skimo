import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    },
    extend: {
      fontFamily: {
        "panchang": ['var(--font-panchang)']
      },
      keyframes: {
        show: {
          '0%': {
            transform: 'translateY(100vh)',
            opacity: "0"
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: "1"
          },
        },
      },
      animation: {
        'show-up': 'show 1s ease forwards 2.5s',
      },
    }
  },
  plugins: [],
}
export default config
