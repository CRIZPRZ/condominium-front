import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
 
import * as directives from 'vuetify/lib/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
export default createVuetify({
  components: {
    VDataTable,
 
  },
  directives,
  
})

 


