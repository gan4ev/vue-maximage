<template>
  <div>
    <MainNavigation />
    <main class="pt-16">
      <div class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {{ $t('features.title') }}
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              {{ $t('features.subtitle') }}
            </p>
          </div>
          
          <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <!-- AI Powered -->
              <div class="flex flex-col">
                <dt class="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                  <Icon icon="heroicons:cpu-chip" class="h-7 w-7 text-purple-500" />
                  {{ $t('features.features.aiPowered.title') }}
                </dt>
                <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p class="flex-auto">{{ $t('features.features.aiPowered.description') }}</p>
                </dd>
              </div>

              <!-- Easy to Use -->
              <div class="flex flex-col">
                <dt class="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                  <Icon icon="heroicons:cursor-arrow-rays" class="h-7 w-7 text-purple-500" />
                  {{ $t('features.features.easyToUse.title') }}
                </dt>
                <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p class="flex-auto">{{ $t('features.features.easyToUse.description') }}</p>
                </dd>
              </div>

              <!-- Fast Generation -->
              <div class="flex flex-col">
                <dt class="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                  <Icon icon="heroicons:bolt" class="h-7 w-7 text-purple-500" />
                  {{ $t('features.features.fast.title') }}
                </dt>
                <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p class="flex-auto">{{ $t('features.features.fast.description') }}</p>
                </dd>
              </div>
            </dl>
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
