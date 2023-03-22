import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'


// DX
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { loadMessages, locale } from "devextreme/localization";
import esMessages from "devextreme/localization/messages/es.json";
loadMessages(esMessages);
locale("es");


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
