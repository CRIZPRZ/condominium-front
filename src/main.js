


import { createApp } from 'vue'  
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.css';
import vuetify from '@/plugins/vuetify';
import '@/assets/css/style.css'
import { can, role } from '@/modules/admin/helpers/CheckPermission'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import { OhVueIcon, addIcons } from "oh-vue-icons";

import * as FaIcons from "oh-vue-icons/icons/fa";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);

 


const pinia = createPinia()

const app = createApp(App)

// Define the global function
app.config.globalProperties.can = can
app.config.globalProperties.role = role

app.component("v-icon", OhVueIcon);
app.use(pinia)
app.use(router)
app.use(vuetify);
app.use(BootstrapIconsPlugin)
app.mount('#app')
