<template>
  <div class="min-h-screen bg-[#0D0D0F]">
    <MainNavigation />
    
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 sm:text-6xl">
            {{ $t('features.title') }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            {{ $t('features.subtitle') }}
          </p>
        </div>
        
        <!-- Image Showcase -->
        <div class="relative h-[500px] mt-16">
          <img 
            src="../assets/features/butterfly.jpg" 
            :alt="$t('features.showcase.butterfly')" 
            class="absolute w-[480px] h-[270px] object-cover rounded-2xl shadow-2xl transform -translate-x-[90%] -translate-y-1/2 top-1/2 left-1/2 rotate-[-15deg] hover:scale-105 transition-transform z-30" 
          />
          <img 
            src="../assets/features/finch.jpg" 
            :alt="$t('features.showcase.finch')" 
            class="absolute w-[480px] h-[270px] object-cover rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-105 transition-transform z-20" 
          />
          <img 
            src="../assets/features/flamingo.jpg" 
            :alt="$t('features.showcase.flamingo')" 
            class="absolute w-[480px] h-[270px] object-cover rounded-2xl shadow-2xl transform -translate-x-[10%] -translate-y-1/2 top-1/2 left-1/2 rotate-[15deg] hover:scale-105 transition-transform z-10" 
          />
        </div>

        <!-- Call to Action -->
        <div class="mt-16 text-center">
          <RouterLink 
            to="/dashboard" 
            class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full hover:scale-105 transition-all duration-300"
          >
            {{ $t('common.startCreating') }}
            <Icon icon="heroicons:arrow-right" class="ml-2 h-5 w-5" />
          </RouterLink>
        </div>
        
        <!-- Language Selection -->
        <div class="mt-16 flex justify-center gap-8">
          <button 
            class="language-card px-8 py-4 w-80" 
            @click="changeLanguage('en')"
          >
            <h3 class="text-xl font-semibold mb-2">Assist</h3>
            <p class="text-sm text-gray-300">{{ $t('features.languages.english') }}</p>
          </button>
          <button 
            class="language-card px-8 py-4 w-80" 
            @click="changeLanguage('bg')"
          >
            <h3 class="text-xl font-semibold mb-2">Български</h3>
            <p class="text-sm text-gray-300">{{ $t('features.languages.bulgarian') }}</p>
          </button>
          <button 
            class="language-card px-8 py-4 w-80" 
            @click="changeLanguage('ru')"
          >
            <h3 class="text-xl font-semibold mb-2">Русский</h3>
            <p class="text-sm text-gray-300">{{ $t('features.languages.russian') }}</p>
          </button>
        </div>
      </div>
    </section>

    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute top-1/4 -left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
import MainNavigation from '../components/MainNavigation.vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<style scoped>
.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}

.icon-wrapper {
  display: inline-flex;
  padding: 1rem;
  border-radius: 1rem;
  background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
}

.language-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.language-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}

/* Image animations */
img {
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

img:nth-child(1) {
  animation-name: float1;
}

img:nth-child(2) {
  animation-name: float2;
}

img:nth-child(3) {
  animation-name: float3;
}

@keyframes float1 {
  0%, 100% { transform: translate(-90%, -50%) rotate(-15deg); }
  50% { transform: translate(-90%, -60%) rotate(-12deg); }
}

@keyframes float2 {
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  50% { transform: translate(-50%, -40%) rotate(3deg); }
}

@keyframes float3 {
  0%, 100% { transform: translate(-10%, -50%) rotate(15deg); }
  50% { transform: translate(-10%, -60%) rotate(12deg); }
}
</style>
