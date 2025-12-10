import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff4b2b',
          dark: '#e63e1f',
          light: '#ff6f52',
        },
        secondary: {
          DEFAULT: '#1f2937',
          light: '#374151',
        },
        accent: '#fbbf24',
        background: '#fffaf5',
        text: '#111827',
      },
    },
  },
  plugins: [],
};
export default config;
