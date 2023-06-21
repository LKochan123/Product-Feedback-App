/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#B11FEA',
        'white': '#fff',
        'body': 'rgb(242, 242, 242)',
        'header': '#3a4373',
        'gray': '#647196',
        'light-blue': 'rgb(241, 243, 254)',
        'blue': '#4761E6',
        'dark-blue': 'rgb(55, 63, 104)',
        'planned-status': 'orange',
        'progress-status': 'rgb(188, 23, 188)',
        'live-status': 'rgb(89, 229, 229)'
      },
    },
    screens: {
      xs: '360px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xlg: '1150px',
      xl: '1440px',
    },
  },
  plugins: [],
}
