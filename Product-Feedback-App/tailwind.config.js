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
        'blue': '#4761E6',
        'body': '#F7F8FD',
        'header': '#3a4373',
        'dark-blue': '#647196'
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xlg: '1150px',
      xl: '1440px',
    },
  },
  plugins: [],
}
