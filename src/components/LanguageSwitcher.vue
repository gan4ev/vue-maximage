<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
    >
      <span class="text-xl">{{ currentLocale === 'bg' ? '🇧🇬' : currentLocale === 'ru' ? '🇷🇺' : '🇬🇧' }}</span>
      <span class="text-sm">{{ currentLocale === 'bg' ? 'БГ' : currentLocale === 'ru' ? 'РУ' : 'EN' }}</span>
      <Icon icon="heroicons:chevron-down" class="h-4 w-4" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown -->
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-32 bg-[#0D0D0F] border border-white/10 rounded-lg shadow-lg py-1 z-50"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="changeLocale(locale.code)"
        class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 flex items-center space-x-2"
      >
        <span class="text-xl">{{ locale.flag }}</span>
        <span>{{ locale.name }}</span>
      </button>
    </div>

    <!-- Backdrop -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { locale } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => locale.value)

const availableLocales = [
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
]

const changeLocale = (newLocale) => {
  locale.value = newLocale
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
