import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import './style.css'
import 'flowbite'
import i18n from './i18n'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    afterSignInUrl: '/dashboard',
    afterSignUpUrl: '/dashboard',
})
app.use(i18n)

app.mount('#app')
