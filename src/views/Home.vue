<template>
  <div class="h-screen bg-[#0D0D0F] flex flex-col overflow-hidden">
    <MainNavigation class="z-50 relative" />
    <main class="flex-1 flex items-center relative">
      <!-- Hero Section -->
      <div class="mx-auto max-w-7xl px-6 w-full grid grid-cols-2 gap-12 relative">
        <!-- Left Content -->
        <div class="flex flex-col justify-center relative z-30">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-slide-in">
            {{ $t('home.hero.title') }}
            <span class="block mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              AI Magic
            </span>
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-300 animate-slide-in-delay">
            {{ $t('home.hero.subtitle') }}
          </p>
          <div class="mt-10 flex items-center gap-x-6 animate-slide-in-delay-2">
            <RouterLink 
              to="/dashboard"
              class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span class="relative flex items-center">
                {{ $t('home.hero.tryNow') }}
                <Icon icon="heroicons:sparkles" class="ml-2 h-5 w-5" />
              </span>
            </RouterLink>
            <RouterLink 
              to="/features"
              class="group text-lg font-semibold leading-6 text-white hover:text-purple-400 transition-colors duration-200"
            >
              <span class="flex items-center">
                {{ $t('home.hero.learnMore') }}
                <Icon icon="heroicons:arrow-right" class="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </RouterLink>
          </div>
        </div>

        <!-- Right Image Showcase -->
        <div class="relative flex items-start justify-center pt-20 translate-x-20">
          <!-- Floating Images -->
          <div class="image-showcase">
            <div class="showcase-item item-1">
              <img 
                src="https://img.freepik.com/free-photo/beautiful-mountains-landscape_23-2151151094.jpg?t=st=1734887683~exp=1734891283~hmac=94eb17605a05272d362f1fc9c94b035c3065b4afb40745041bc0cacc0969929c&w=1480" 
                alt="AI Landscape" 
                class="rounded-2xl shadow-2xl"
              />
              <div class="label">Landscape</div>
            </div>
            <div class="showcase-item item-2">
              <img 
                src="https://img.freepik.com/free-photo/3d-floral-bouquet-white-background-generative-ai_191095-2123.jpg" 
                alt="AI Art" 
                class="rounded-2xl shadow-2xl"
              />
              <div class="label">3D Art</div>
            </div>
            <div class="showcase-item item-3">
              <img 
                src="https://img.freepik.com/free-photo/school-playground-anime-style_23-2151125224.jpg" 
                alt="AI Anime" 
                class="rounded-2xl shadow-2xl"
              />
              <div class="label">Anime Style</div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div class="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import MainNavigation from '../components/MainNavigation.vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

const { t } = useI18n()

useHead({
  title: t('home.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('home.hero.subtitle')
    }
  ]
})
</script>

<style scoped>
.image-showcase {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 60px; /* Reduced margin to move images more up */
  z-index: 10;
  perspective: 1000px;
  overflow: visible;
}

.showcase-item {
  position: absolute;
  width: 320px;
  height: 400px;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.showcase-item:hover {
  transform: scale(1.05) translateY(-10px);
  z-index: 20;
}

.showcase-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.showcase-item:hover img {
  transform: scale(1.1);
}

.showcase-item .label {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  backdrop-filter: blur(4px);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.5s ease;
}

.showcase-item:hover .label {
  transform: translateY(0);
  opacity: 1;
}

.item-1 {
  top: -40px;  /* Moved higher up */
  left: 0;
  z-index: 3;
  animation: float1 6s ease-in-out infinite;
}

.item-2 {
  top: 60px;
  left: 60px;
  z-index: 2;
  animation: float2 7s ease-in-out infinite;
}

.item-3 {
  top: 120px;
  left: 120px;
  z-index: 1;
  animation: float3 8s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateX(-40%) translateY(-20%) rotate(-15deg); }
  50% { transform: translateX(-40%) translateY(-25%) rotate(-12deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateX(10%) translateY(-10%); }
  50% { transform: translateX(10%) translateY(-15%); }
}

@keyframes float3 {
  0%, 100% { transform: translateX(60%) translateY(0%) rotate(15deg); }
  50% { transform: translateX(60%) translateY(-5%) rotate(12deg); }
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

.animate-slide-in {
  animation: slideIn 1s ease-out;
}

.animate-slide-in-delay {
  animation: slideIn 1s ease-out 0.3s backwards;
}

.animate-slide-in-delay-2 {
  animation: slideIn 1s ease-out 0.6s backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradientShift 5s linear infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
