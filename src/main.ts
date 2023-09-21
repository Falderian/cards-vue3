import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue3-cookies'
import 'vue-final-modal/style.css'
import { createVfm } from 'vue-final-modal'
import Notifications from '@kyvg/vue3-notification'
import './styles/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vfm = createVfm()

app.use(createPinia())
app.use(router)
app.use(VueCookies, {
  expireTimes: '1d'
})
app.use(vfm)
app.use(Notifications)

app.mount('#app')
