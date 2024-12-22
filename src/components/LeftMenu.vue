<!-- LeftMenu.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Models</h2>
    <nav class="space-y-2">
      <button
        v-for="model in models"
        :key="model.id"
        @click="selectModel(model.id)"
        :class="[
          'w-full text-left px-4 py-2 rounded-lg transition-colors',
          currentModel === model.id
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
      >
        {{ model.name }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['modelSelected'])

const currentModel = ref('ideogram')

const models = [
  { id: 'ideogram', name: 'Generate Images' },
  { id: 'gallery', name: 'Image Gallery' },
  { id: 'stable', name: 'Stable Diffusion (Soon)' },
  { id: 'dalle', name: 'DALL-E (Soon)' }
]

const selectModel = (modelId) => {
  currentModel.value = modelId
  emit('modelSelected', modelId)
}
</script>
