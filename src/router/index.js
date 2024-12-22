import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Features from '../views/Features.vue'
import Pricing from '../views/Pricing.vue'
import Contact from '../views/Contact.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
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
  
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Wait for the auth state to be determined
    if (isSignedIn.value === undefined) {
      // Auth state not yet determined, wait briefly and check again
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    if (!isSignedIn.value) {
      // User is not signed in, redirect to home
      next({ 
        path: '/',
        query: { redirect: to.fullPath }  // Store the attempted URL for later
      })
      return
    }
  }
  
  next()
})

export default router
