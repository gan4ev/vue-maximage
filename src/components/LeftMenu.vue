<!-- LeftMenu.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Models</h2>
    <div class="space-y-4">
      <!-- Ideogram -->
      <button
        @click="selectModel('ideogram')"
        class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
        :class="[
          currentModel === 'ideogram'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        <div class="flex items-center">
          <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-3" />
          <div>
            <div class="font-medium">Ideogram v2</div>
            <div class="text-sm opacity-80">High-quality image generation</div>
          </div>
        </div>
      </button>

      <!-- Recraft -->
      <button
        @click="selectModel('recraft')"
        class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
        :class="[
          currentModel === 'recraft'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        <div class="flex items-center">
          <Icon icon="heroicons:photo" class="w-5 h-5 mr-3" />
          <div>
            <div class="font-medium">Recraft v3</div>
            <div class="text-sm opacity-80">Advanced image generation with styles</div>
          </div>
        </div>
      </button>

      <!-- Gallery -->
      <button
        @click="selectModel('gallery')"
        class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
        :class="[
          currentModel === 'gallery'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        <div class="flex items-center">
          <Icon icon="heroicons:photo-album" class="w-5 h-5 mr-3" />
          <div>
            <div class="font-medium">Gallery</div>
            <div class="text-sm opacity-80">View your generated images</div>
          </div>
        </div>
      </button>

      <!-- Stable -->
      <button
        @click="selectModel('stable')"
        class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
        :class="[
          currentModel === 'stable'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        <div class="flex items-center">
          <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-3" />
          <div>
            <div class="font-medium">Stable Diffusion (Soon)</div>
            <div class="text-sm opacity-80">High-quality image generation</div>
          </div>
        </div>
      </button>

      <!-- Dalle -->
      <button
        @click="selectModel('dalle')"
        class="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
        :class="[
          currentModel === 'dalle'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        <div class="flex items-center">
          <Icon icon="heroicons:sparkles" class="w-5 h-5 mr-3" />
          <div>
            <div class="font-medium">DALL-E (Soon)</div>
            <div class="text-sm opacity-80">High-quality image generation</div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['modelSelected'])
const currentModel = ref('ideogram')

const selectModel = (model) => {
  currentModel.value = model
  emit('modelSelected', model)
}
</script>
