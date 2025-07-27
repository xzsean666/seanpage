import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura' // 导入Aura主题
import router from './route' // Import the router

import 'primeicons/primeicons.css' // PrimeIcons 依然需要单独导入

import './style.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router) // Use the router
app.use(PrimeVue, {
  theme: {
    preset: Aura, // 使用Aura主题预设
  },
})

router.afterEach(to => {
  // Update page title
  document.title = (to.meta?.title as string) || 'Default Title'

  // Update favicon
  const faviconLink = document.getElementById('favicon') as HTMLLinkElement
  if (faviconLink) {
    // Example: change favicon based on route name
    if (to.name === 'Home') {
      faviconLink.href = '/sean.jpeg' // Or any other favicon for Home
    } else if (to.name === 'Dashboard') {
      faviconLink.href = '/vue.svg' // Or any other favicon for Dashboard
    } else {
      faviconLink.href = '/vite.svg' // Default favicon
    }
  }
})

app.mount('#app')
