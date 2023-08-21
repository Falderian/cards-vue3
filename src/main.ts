import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue3-cookies'
import 'vue-final-modal/style.css'
import './styles/main.scss'

import App from './App.vue'
import router from './router'
import { createVfm } from 'vue-final-modal'

const app = createApp(App)

const vfm = createVfm()

app.use(createPinia())
app.use(router)
app.use(VueCookies, {
  expireTimes: '1d'
})
app.use(vfm)

app.mount('#app')
