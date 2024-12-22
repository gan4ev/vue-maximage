<template>
  <div>
    <MainNavigation />
    <main class="pt-16">
      <div class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {{ $t('about.title') }}
            </h2>
          </div>

          <!-- Mission Section -->
          <div class="mt-16 sm:mt-20">
            <div class="lg:text-center">
              <p class="mt-6 text-lg leading-8 text-gray-300">
                {{ $t('about.mission.description') }}
              </p>
            </div>
          </div>

          <!-- Values Section -->
          <div class="mt-16 sm:mt-20">
            <div class="lg:text-center mb-12">
              <h3 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {{ $t('about.values.title') }}
              </h3>
            </div>
            
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Innovation -->
              <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div class="flex items-center gap-4 mb-4">
                  <div class="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                    <Icon icon="heroicons:light-bulb" class="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 class="text-xl font-semibold text-white">
                    {{ $t('about.values.innovation.title') }}
                  </h4>
                </div>
                <p class="text-gray-400">
                  {{ $t('about.values.innovation.description') }}
                </p>
              </div>

              <!-- Community -->
              <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div class="flex items-center gap-4 mb-4">
                  <div class="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                    <Icon icon="heroicons:user-group" class="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 class="text-xl font-semibold text-white">
                    {{ $t('about.values.community.title') }}
                  </h4>
                </div>
                <p class="text-gray-400">
                  {{ $t('about.values.community.description') }}
                </p>
              </div>

              <!-- Trust -->
              <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div class="flex items-center gap-4 mb-4">
                  <div class="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                    <Icon icon="heroicons:shield-check" class="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 class="text-xl font-semibold text-white">
                    {{ $t('about.values.trust.title') }}
                  </h4>
                </div>
                <p class="text-gray-400">
                  {{ $t('about.values.trust.description') }}
                </p>
              </div>
            </div>
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

const { t } = useI18n()
</script>
