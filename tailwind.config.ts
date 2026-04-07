import type { Config } from 'tailwindcss';
import typography from "@tailwindcss/typography"
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './hocs/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
    './redux/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'dark-main': '#0D1117',
        'dark-bg': '#161B22',
        'dark-second': '#21262D',
        'dark-third': '#30363D',
        dark: '#161B22',
        'dark-border': '#5B6473',
        'dark-txt': '#C9D1D9',
        'dark-txt-secondary': '#AAB2BB',
        'dark-primary': '#5046e4',
        'dark-accent': '#c7d2fe',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;