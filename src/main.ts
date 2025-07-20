import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura' // 导入Aura主题

import 'primeicons/primeicons.css' // PrimeIcons 依然需要单独导入

import './style.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura, // 使用Aura主题预设
  },
})
app.mount('#app')
