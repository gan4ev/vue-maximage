import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'flowbite'
import i18n from './i18n'

const app = createApp(App)

app.use(router)
app.use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
})
app.use(i18n)

app.mount('#app')
