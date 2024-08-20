import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here if needed
        // For example:
        // primary: '#3490dc',
        // secondary: '#ffed4a',
      },
      fontFamily: {
        // Add custom fonts here if you're using any
        // For example:
        // sans: ['Graphik', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      spacing: {
        // Add custom spacing values if needed
        // For example:
        // '128': '32rem',
      },
      borderRadius: {
        // Add custom border radius values if needed
        // For example:
        // 'xl': '1rem',
      },
      backdropFilter: {
        // Add custom backdrop filter values if needed
        // For example:
        // 'none': 'none',
        // 'blur': 'blur(20px)',
      },
      backdropBlur: {
        // Add custom backdrop blur values if needed
        // For example:
        // 'none': 'none',
        // 'md': '12px',
      },
    },
  },
  plugins: [
    // Add any Tailwind CSS plugins here
    // For example:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  variants: {
    extend: {
      backdropFilter: ['responsive'],
      backdropBlur: ['responsive'],
    },
  },
}

export default config