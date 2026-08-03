/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'oklch(10% 0.006 50)',
        'bg-2': 'oklch(13.5% 0.010 48)',
        'bg-3': 'oklch(17% 0.014 46)',
        brown: 'oklch(22% 0.042 45)',
        gold: 'oklch(73.5% 0.073 82)',
        'gold-lo': 'oklch(62% 0.062 80)',
        fire: 'oklch(66.5% 0.163 48)',
        pom: 'oklch(47% 0.150 21)',
        ink: 'oklch(97.5% 0.005 85)',
        muted: 'oklch(79% 0.013 80)',
        faint: 'oklch(58% 0.012 78)',
        line: 'oklch(28% 0.014 58)',
        'line-soft': 'oklch(22% 0.010 55)',
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
      },
      keyframes: {
        grain: {
          '0%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-3%,2%)' },
          '40%': { transform: 'translate(2%,-3%)' },
          '60%': { transform: 'translate(-2%,-2%)' },
          '80%': { transform: 'translate(3%,1%)' },
          '100%': { transform: 'translate(0,0)' },
        },
        flicker: {
          '0%', '100%': { transform: 'scaleY(1)' },
          '42%': { transform: 'scaleY(1.09) translateY(-.5px)' },
          '70%': { transform: 'scaleY(.96)' },
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 oklch(66% .163 48 / .5)' },
          '70%': { boxShadow: '0 0 0 12px oklch(66% .163 48 / 0)' },
          '100%': { boxShadow: '0 0 0 0 oklch(66% .163 48 / 0)' },
        },
        travel: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(280%)' },
        },
      },
      animation: {
        grain: 'grain 6s steps(5) infinite',
        flicker: 'flicker 3.6s cubic-bezier(.65,0,.35,1) infinite',
        pulse: 'pulse 2.6s cubic-bezier(.65,0,.35,1) infinite',
        travel: 'travel 2.4s cubic-bezier(.65,0,.35,1) infinite',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        eyebrow: '.6875rem',
        sm: '.8125rem',
        base: '1rem',
        lead: 'clamp(1rem, .55vw + .85rem, 1.1875rem)',
        h2: 'clamp(2rem, 3.4vw + .6rem, 4rem)',
        display: 'clamp(2.9rem, 9.4vw, 8.5rem)',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4.2vw, 4.5rem)',
      },
      zIndex: {
        nav: '60',
        drawer: '80',
      },
    },
  },
  plugins: [],
}