/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs,js}"],
  theme: {
    extend: {height: {
      'screen-nav': 'calc(100vh - 64px)',
    },},
  },
  plugins: [],
};
