/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1140px',
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#23211E',
          50: '#F5F4F2',
          100: '#E4E1DC',
          200: '#C7C2B9',
          300: '#9B958A',
          400: '#6F6A60',
          500: '#4A4640',
          600: '#39362F',
          700: '#2C2A25',
          800: '#23211E',
          900: '#181713',
        },
        paper: {
          DEFAULT: '#EDEAE3',
          soft: '#F4F2ED',
          dim: '#DFDAD0',
        },
        rust: {
          DEFAULT: '#9A3324',
          50: '#F7E9E5',
          100: '#EACAC1',
          300: '#C06A54',
          400: '#AC4C36',
          500: '#9A3324',
          600: '#7E281C',
          700: '#621F16',
        },
        steel: {
          DEFAULT: '#45586B',
          50: '#EAEDF0',
          100: '#CBD3DB',
          200: '#A7B4C1',
          300: '#8CA0B3',
          400: '#647A8E',
          500: '#45586B',
          600: '#374658',
          700: '#293441',
        },
      },
      fontFamily: {
        display: ['"Archivo"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mark: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        panel: '0 1px 0 rgba(35,33,30,0.08), 0 18px 40px -22px rgba(35,33,30,0.35)',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '6px',
      },
    },
  },
  plugins: [],
}
