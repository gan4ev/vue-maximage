<template>
  <div>
    <MainNavigation />
    <main class="pt-16">
      <div class="py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {{ $t('contact.title') }}
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              {{ $t('contact.subtitle') }}
            </p>
          </div>

          <div class="mx-auto mt-16 max-w-xl sm:mt-20">
            <form class="space-y-8">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium leading-6 text-white">
                  {{ $t('contact.form.name') }}
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-white">
                  {{ $t('contact.form.email') }}
                </label>
                <div class="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium leading-6 text-white">
                  {{ $t('contact.form.message') }}
                </label>
                <div class="mt-2">
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                >
                  {{ $t('contact.form.send') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import MainNavigation from '../components/MainNavigation.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
