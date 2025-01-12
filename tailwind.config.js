/** @type {import('tailwindcss').Config} */
const {
  addDynamicIconSelectors,
} = require('@iconify/tailwind', '@preline/plugin', 'flowbite/plugin')

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/preline/dist/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'breaking-bad': "url('/img/BREAKINGBAD.png')",
        'radial-top-right':
          'radial-gradient(circle at top right, #8762ac, #563f6e, #372846, #372846, #372846, #372846, #372846,  #372846, #372846)',
        'dark-gradient':
          'linear-gradient(to bottom, rgba(36, 36, 36, 0),rgba(36, 36, 36, 0.25),rgba(36, 36, 36, 0.5),rgba(36, 36, 36, 0.75),rgba(36, 36, 36))',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'serif'],
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
}
