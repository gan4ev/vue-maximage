<template>
  <div class="min-h-screen bg-[#0D0D0F]">
    <!-- Simple Navigation -->
    <nav class="bg-[#0D0D0F] border-b border-white/10 h-16 flex items-center px-6">
      <div class="flex justify-between items-center w-full max-w-7xl mx-auto">
        <!-- Logo -->
        <RouterLink to="/" class="text-2xl font-bold text-white">
          MaxImages
        </RouterLink>

        <!-- Menu Items -->
        <div class="flex items-center space-x-8">
          <RouterLink v-for="item in menuItems" 
                   :key="item.name" 
                   :to="item.href"
                   class="text-white hover:text-gray-300 transition-colors duration-200">
            {{ item.name }}
          </RouterLink>
          
          <!-- Sign In/Sign Out Button -->
          <SignInButton v-if="!isSignedIn" mode="modal" />
          <SignOutButton v-else />
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SignInButton, SignOutButton, useAuth } from '@clerk/vue'

const { isSignedIn } = useAuth()

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'About', href: '/about' }
]
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #0D0D0F;
}
</style>
