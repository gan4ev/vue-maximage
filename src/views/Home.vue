<template>
  <div class="min-h-screen bg-[#0D0D0F]">
    <MainNavigation />
    <main class="pt-16">
      <!-- Hero Section -->
      <div class="relative isolate">
        <!-- Gradient Effects -->
        <div class="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 class="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {{ $t('home.hero.title') }}
              <span class="block mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              {{ $t('home.hero.subtitle') }}
            </p>
            <div class="mt-10 flex items-center gap-x-6">
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
          <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div class="relative aspect-square w-[36rem] rounded-xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 p-2 border border-white/10">
                <!-- Floating Elements -->
                <div class="absolute -top-4 -left-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white border border-white/10 flex items-center">
                  <Icon icon="heroicons:sparkles" class="mr-2 h-4 w-4 text-purple-400" />
                  AI Generated
                </div>
                
                <div class="absolute -bottom-4 -right-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white border border-white/10 flex items-center">
                  <Icon icon="heroicons:camera" class="mr-2 h-4 w-4 text-purple-400" />
                  4K Resolution
                </div>

                <!-- Image -->
                <img 
                  :src="HeroBg" 
                  alt="AI Generated Art"
                  class="w-full h-full object-cover rounded-lg transform hover:scale-[1.02] transition-transform duration-500" 
                />

                <!-- Floating Stats -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-lg rounded-2xl p-6 border border-white/10 w-64">
                  <div class="text-center">
                    <h3 class="text-white font-semibold mb-2">AI Generation Stats</h3>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <div class="text-purple-400 text-2xl font-bold">500ms</div>
                        <div class="text-gray-400 text-sm">Generation Time</div>
                      </div>
                      <div>
                        <div class="text-purple-400 text-2xl font-bold">99%</div>
                        <div class="text-gray-400 text-sm">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Gradient -->
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      <!-- Features Preview -->
      <div class="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-purple-400">Powerful Features</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to create stunning AI art
          </p>
        </div>

        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div class="group flex flex-col relative overflow-hidden rounded-2xl bg-white/5 p-8 border border-white/10 transition-colors duration-300 hover:bg-white/10">
              <dt class="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                <Icon icon="heroicons:cpu-chip" class="h-7 w-7 text-purple-400" />
                Advanced AI Models
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p class="flex-auto">State-of-the-art AI models trained on diverse artistic styles.</p>
              </dd>
            </div>

            <div class="group flex flex-col relative overflow-hidden rounded-2xl bg-white/5 p-8 border border-white/10 transition-colors duration-300 hover:bg-white/10">
              <dt class="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                <Icon icon="heroicons:bolt" class="h-7 w-7 text-purple-400" />
                Lightning Fast
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p class="flex-auto">Generate high-quality images in milliseconds.</p>
              </dd>
            </div>

            <div class="group flex flex-col relative overflow-hidden rounded-2xl bg-white/5 p-8 border border-white/10 transition-colors duration-300 hover:bg-white/10">
              <dt class="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                <Icon icon="heroicons:cursor-arrow-rays" class="h-7 w-7 text-purple-400" />
                Easy to Use
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p class="flex-auto">Intuitive interface designed for all skill levels.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import MainNavigation from '../components/MainNavigation.vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import HeroBg from '../assets/hero-bg.jpg'

const { t } = useI18n()
</script>

<style scoped>
.group:hover .absolute {
  opacity: 1;
  transform: translateY(0);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
