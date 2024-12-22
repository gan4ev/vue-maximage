import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from '@clerk/vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isSignedIn } = useUser()
  
  if (to.meta.requiresAuth && !isSignedIn.value) {
    next('/')
  } else {
    next()
  }
})

export default router
