module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        highlight: '5px solid rgba(0, 0, 0, 0.28)',
      },
      boxShadow: {
        separate: '0px 0px 6px 0 rgba(0, 0, 0, 0.2)',
      }
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'group-focus'],
      outline: ['hover']
    },
  },
  plugins: [],
}
