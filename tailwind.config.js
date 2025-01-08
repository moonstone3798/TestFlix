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
          'radial-gradient(circle at top right, #8762ac, #7e5ba1, #755595, #6c4e8a, #63487f, #5d4377, #563f6e, #503a66, #4a355e, #433156, #3d2c4e, #372846)',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'serif'],
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
}
