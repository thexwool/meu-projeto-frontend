import WebFont from 'webfontloader'

export function loadFonts () {
  WebFont.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
    custom: {
      families: ['Material Icons'],
      urls: ['https://fonts.googleapis.com/css?family=Material+Icons'],
    },
  })
}
