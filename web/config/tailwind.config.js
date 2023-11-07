/** @type {import('tailwindcss').Config} */
export const content = ['src/**/*.{js,jsx,ts,tsx}']
export const theme = {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      logo: {
        DEFAULT: '#246EB9',
        hover: '#1f5d9d',
      },
    },
  },
}
export const plugins = [require('daisyui'), require('tailwindcss-animate')]
export const daisyui = {
  themes: ['light', 'dark'],
}
