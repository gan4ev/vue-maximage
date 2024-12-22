<template>
  <div class="min-h-screen bg-[#0D0D0F] overflow-hidden">
    <!-- Navigation -->
    <nav class="fixed w-full z-50 top-0 backdrop-blur-lg border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <span class="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              MaxImages
            </span>
          </div>

          <!-- Menu Items -->
          <div class="hidden md:flex items-center space-x-8">
            <a v-for="item in menuItems" :key="item.name" 
               :href="item.href"
               class="text-lg font-medium text-white hover:text-purple-400 transition-colors duration-200">
              {{ item.name }}
            </a>
          </div>

          <!-- CTA Button -->
          <div class="flex items-center space-x-4">
            <SignInButton v-if="!isSignedIn" mode="modal" class="bg-white/10 hover:bg-white/20 
                             text-white px-6 py-2.5 rounded-full text-sm font-medium
                             transition-all duration-200">
              Sign In
            </SignInButton>
            <SignOutButton v-else class="bg-white/10 hover:bg-white/20 
                             text-white px-6 py-2.5 rounded-full text-sm font-medium
                             transition-all duration-200" />
            
            <RouterLink to="/dashboard" 
                      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                             text-white px-6 py-2.5 rounded-full text-sm font-medium
                             hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200">
              Start Creating
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative pt-32 pb-20 sm:pt-40">
      <!-- Gradient Orb -->
      <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Create Art with
              <span class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                AI Magic
              </span>
            </h1>
            <p class="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
              Transform your ideas into stunning visuals using next-generation AI technology. 
              Push the boundaries of creativity in 2025.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <RouterLink to="/dashboard" 
                        class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200">
                Start Creating
                <Icon icon="heroicons:arrow-right" class="ml-2 h-5 w-5" />
              </RouterLink>
              <RouterLink to="/about"
                        class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-200">
                Learn More
                <Icon icon="heroicons:arrow-right" class="ml-2 h-5 w-5" />
              </RouterLink>
            </div>
          </div>

          <!-- Right Content - 3D Image -->
          <div class="relative">
            <div class="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 p-2">
              <img :src="HeroBg" 
                   alt="AI Generated Art"
                   class="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500" />
              
              <!-- Floating Elements -->
              <div class="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white border border-white/10">
                <Icon icon="heroicons:sparkles" class="inline-block mr-2 h-4 w-4" />
                AI Generated
              </div>
              
              <div class="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white border border-white/10">
                <Icon icon="heroicons:camera" class="inline-block mr-2 h-4 w-4" />
                4K Resolution
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="relative py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" 
               class="group relative bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-200 border border-white/10">
            <div class="flex items-center gap-4 mb-4">
              <div class="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                <Icon :icon="feature.icon" class="h-6 w-6 text-purple-400" />
              </div>
              <h3 class="text-xl font-semibold text-white">{{ feature.title }}</h3>
            </div>
            <p class="text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>

<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { SignInButton, SignOutButton, useAuth } from '@clerk/vue'
import HeroBg from '../assets/hero-bg.jpg'

const { isSignedIn } = useAuth()

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '#contact' }
]

const features = [
  {
    icon: 'heroicons:sparkles',
    title: 'Advanced AI',
    description: 'Access cutting-edge AI models trained on diverse artistic styles and techniques.'
  },
  {
    icon: 'heroicons:bolt',
    title: 'Real-Time Generation',
    description: 'Create stunning visuals in seconds with our optimized AI pipeline.'
  },
  {
    icon: 'heroicons:adjustments-horizontal',
    title: 'Creative Control',
    description: 'Fine-tune every aspect of your generated images with precise controls.'
  }
]
</script>
