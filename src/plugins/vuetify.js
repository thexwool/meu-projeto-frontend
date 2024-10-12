import 'vuetify/styles' // Importa os estilos do Vuetify
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Certifique-se de importar os ícones do Material Design

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
  },
})

export default vuetify
