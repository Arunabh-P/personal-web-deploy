import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
        },
        success: {
          DEFAULT: 'var(--success)',
          light: 'var(--success-light)',
          dark: 'var(--success-dark)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          light: 'var(--warning-light)',
          dark: 'var(--warning-dark)',
        },
        error: {
          DEFAULT: 'var(--error)',
          light: 'var(--error-light)',
          dark: 'var(--error-dark)',
        },
        black: {
          50: 'var(--color-black-50)',
          100: 'var(--color-black-100)',
          150: 'var(--color-black-150)',
          200: 'var(--color-black-200)',
          250: 'var(--color-black-250)',
        },
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          150: 'var(--color-gray-150)',
          200: 'var(--color-gray-200)',
          250: 'var(--color-gray-250)',
          300: 'var(--color-gray-300)',
        },
        yellow: {
          50: 'var(--color-yellow-50)',
        },
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'roboto'],
        lora: ['var(--font-lora)', 'lora'],
      },
    },
  },
} satisfies Config;
