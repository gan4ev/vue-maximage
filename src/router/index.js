import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const { isSignedIn } = useAuth()
  
  if (to.meta.requiresAuth && !isSignedIn) {
    // Redirect to home if trying to access protected route
    next('/')
  } else {
    next()
  }
})

export default router
