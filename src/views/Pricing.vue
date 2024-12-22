<template>
  <div>
    <MainNavigation />
    <main class="pt-16">
      <div class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-4xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {{ $t('pricing.title') }}
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              {{ $t('pricing.subtitle') }}
            </p>
          </div>

          <!-- Toggle Monthly/Yearly -->
          <div class="mt-16 flex justify-center">
            <div class="relative flex rounded-full bg-white/5 p-1">
              <button
                @click="billing = 'monthly'"
                :class="[
                  billing === 'monthly' 
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white',
                  'px-8 py-2 text-sm font-semibold rounded-full relative z-10 transition-all duration-500'
                ]"
              >
                {{ $t('pricing.monthly') }}
              </button>
              <button
                @click="billing = 'yearly'"
                :class="[
                  billing === 'yearly' 
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white',
                  'px-8 py-2 text-sm font-semibold rounded-full relative z-10 transition-all duration-500'
                ]"
              >
                {{ $t('pricing.yearly') }}
              </button>
            </div>
          </div>

          <!-- Pricing Plans -->
          <div class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
            <!-- Free Plan -->
            <div class="rounded-3xl p-8 ring-1 ring-white/10 backdrop-blur-lg bg-gradient-to-b from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 transition-all duration-300">
              <h3 class="text-lg font-semibold leading-8 text-white">
                {{ $t('pricing.plans.free.name') }}
              </h3>
              <p class="mt-4 text-sm leading-6 text-gray-300">
                {{ $t('pricing.plans.free.description') }}
              </p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-white">{{ $t('pricing.plans.free.price') }}</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">До 50 генерации месечно</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Основни AI модели</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">HD качество (1080p)</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Стандартна поддръжка</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Без воден знак</p>
                </li>
              </ul>
              <RouterLink
                to="/dashboard"
                class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white bg-white/10 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
              >
                {{ $t('pricing.startTrial') }}
              </RouterLink>
            </div>

            <!-- Pro Plan -->
            <div class="relative rounded-3xl p-8 bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-purple-500/5 ring-2 ring-purple-400">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-1 text-sm font-semibold leading-6 text-white">
                {{ $t('pricing.mostPopular') }}
              </div>
              <h3 class="text-lg font-semibold leading-8 text-white">
                {{ $t('pricing.plans.pro.name') }}
              </h3>
              <p class="mt-4 text-sm leading-6 text-gray-300">
                {{ $t('pricing.plans.pro.description') }}
              </p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-white">{{ $t('pricing.plans.pro.price') }}</span>
                <span v-if="billing === 'monthly'" class="text-sm font-semibold leading-6 text-gray-300">{{ $t('pricing.perMonth') }}</span>
                <span v-else class="text-sm font-semibold leading-6 text-gray-300">{{ $t('pricing.perYear') }}</span>
              </p>
              <div v-if="billing === 'yearly'" class="mt-2 text-sm text-purple-400">
                {{ $t('pricing.yearlyDiscount') }}
              </div>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Неограничени генерации</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Достъп до всички AI модели</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">4K Ultra HD качество</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Приоритетна поддръжка 24/7</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Експорт без воден знак</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Персонализирани настройки</p>
                </li>
              </ul>
              <RouterLink
                to="/dashboard"
                class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
              >
                {{ $t('pricing.startTrial') }}
              </RouterLink>
            </div>

            <!-- Enterprise Plan -->
            <div class="rounded-3xl p-8 ring-1 ring-white/10 backdrop-blur-lg bg-gradient-to-b from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 transition-all duration-300">
              <h3 class="text-lg font-semibold leading-8 text-white">
                {{ $t('pricing.plans.enterprise.name') }}
              </h3>
              <p class="mt-4 text-sm leading-6 text-gray-300">
                {{ $t('pricing.plans.enterprise.description') }}
              </p>
              <p class="mt-6 flex items-baseline gap-x-1">
                <span class="text-4xl font-bold tracking-tight text-white">{{ $t('pricing.plans.enterprise.price') }}</span>
              </p>
              <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Всички PRO функции</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Персонализирани AI модели</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Пълен API достъп</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Персонален мениджър</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">SLA договор</p>
                </li>
                <li class="flex gap-x-3">
                  <Icon icon="heroicons:check" class="h-6 w-5 flex-none text-purple-400" aria-hidden="true" />
                  <p class="leading-6">Индивидуални решения</p>
                </li>
              </ul>
              <RouterLink
                to="/contact"
                class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white bg-white/10 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/20"
              >
                {{ $t('pricing.contactUs') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainNavigation from '../components/MainNavigation.vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const billing = ref('monthly')
</script>

<style scoped>
.pricing-card {
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
}
</style>
