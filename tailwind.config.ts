import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-quicksand)', ...defaultTheme.fontFamily.sans],
        label: ['Montserrat'],
        mono: ['var(--font-vt323)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'heading-1': '48px',
        'heading-2': '36px',
        'heading-3': '24px',
        'heading-4': '18px',
        'heading-5': '14px',
        'heading-6': '12px',
      },
      colors: {
        primary: {
          blue: '#1053B7',
          white: '#FFFFFF',
          black: '#050D18',
          pink: '#CF9EAB',
          brown: '#20020C',
          gray: '#97ACCF',
          '50': '#fdf2f7',
          '100': '#fce7f1',
          '200': '#fbcfe5',
          '300': '#f9a8d0',
          '400': '#f472b2',
          '500': '#ec4899',
          '600': '#db2780',
          '700': '#be186a',
          '800': '#9d1759',
          '900': '#83184d',
          '950': '#50072b',
        },
        secondary: {
          yellow: '#EBA41F',
          red: '#EB1F2B',
        },
        color: {
          primary: '#050D18',
          secondary: '#50555D',
        },
        white: '#FFFFFF',
        black: '#000000',
        yellow: {
          10: '#FDF5E8',
          30: '#F9E3BB',
          50: '#F5D18F',
          70: '#F1BF62',
          100: '#EBA41F',
        },
        red: {
          10: '#FDE8E9',
          30: '#F9BBBF',
          50: '#F58F95',
          70: '#F1626A',
          100: '#EB1F2B',
        },
        blue: {
          10: '#E7EDF7',
          30: '#B7CBE9',
          50: '#87A9DB',
          70: '#5786CC',
          100: '#1053B7',
        },
        gray: {
          10: '#E6E6E7',
          30: '#B4B6B9',
          50: '#82868B',
          70: '#50555D',
          100: '#050D18',
        },
      },
    },
  },
  plugins: [],
};
export default config;
