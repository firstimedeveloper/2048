const plugin = require("tailwindcss/plugin")

module.exports = {
  purge: [],
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },   
    extend: {
      padding: {
        100: '100%'
      },
      maxWidth: {
        500: '500px',
        '1/3': '33.33%',
        '2/5': '40%',
        '1/2': '50%',
        '2/3': '66.66%'
      },
      maxHeight: {
        '2/3': '66.66%'
      },
      width: {
        100: '100%',
      },
      height: {
        100: '100%',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function({ addComponents }) {
    const noselect = {
      '.noselect': {
        "-webkit-touch-callout": "none", /* iOS Safari */
        "-webkit-user-select": "none", /* Safari */
        "-khtml-user-select": "none", /* Konqueror HTML */
        "-moz-user-select": "none", /* Old versions of Firefox */
        "-ms-user-select": "none", /* Internet Explorer/Edge */
        "user-select": "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
      }
      
      
    }

    addComponents(noselect)
  })],
}
