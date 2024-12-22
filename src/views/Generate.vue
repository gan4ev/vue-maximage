<template>
  <div>
    <MainNavigation />
    <div class="min-h-screen bg-[#0D0D0F] pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Generator Header -->
        <div class="mb-12">
          <h1 class="text-4xl font-bold text-white mb-4">Generate Images</h1>
          <p class="text-gray-400">Create stunning AI-generated images with our advanced models</p>
        </div>

        <!-- Image Generator Form -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Input Form -->
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 class="text-xl font-semibold text-white mb-6">Image Settings</h2>
              <form @submit.prevent="generateImage" class="space-y-6">
                <!-- Prompt Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
                  <textarea
                    v-model="form.prompt"
                    rows="3"
                    class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe the image you want to generate..."
                  ></textarea>
                </div>

                <!-- Negative Prompt -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Negative Prompt</label>
                  <textarea
                    v-model="form.negativePrompt"
                    rows="2"
                    class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe what you don't want in the image..."
                  ></textarea>
                </div>

                <!-- Style Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Style</label>
                  <select
                    v-model="form.style"
                    class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a style</option>
                    <option v-for="style in styles" :key="style" :value="style">
                      {{ style }}
                    </option>
                  </select>
                </div>

                <!-- Aspect Ratio -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                  <div class="grid grid-cols-3 gap-4">
                    <button
                      v-for="ratio in aspectRatios"
                      :key="ratio.value"
                      type="button"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        form.aspectRatio === ratio.value
                          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      ]"
                      @click="form.aspectRatio = ratio.value"
                    >
                      {{ ratio.label }}
                    </button>
                  </div>
                </div>

                <!-- Generate Button -->
                <button
                  type="submit"
                  class="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                         text-white py-3 rounded-lg font-medium
                         hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                >
                  Generate Image
                </button>
              </form>
            </div>
          </div>

          <!-- Right Column: Preview -->
          <div class="bg-white/5 rounded-2xl p-6 border border-white/10 h-fit">
            <h2 class="text-xl font-semibold text-white mb-6">Preview</h2>
            <div class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
              <!-- Preview image will go here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainNavigation from '../components/MainNavigation.vue'

const form = ref({
  prompt: '',
  negativePrompt: '',
  style: '',
  aspectRatio: '1:1'
})

const styles = [
  'Photorealistic',
  'Digital Art',
  'Oil Painting',
  'Watercolor',
  'Anime',
  'Pixel Art',
  'Abstract',
  'Minimalist'
]

const aspectRatios = [
  { label: '1:1', value: '1:1' },
  { label: '4:3', value: '4:3' },
  { label: '16:9', value: '16:9' }
]

const generateImage = () => {
  // Here we'll add the image generation logic
  console.log('Generating image with settings:', form.value)
}
</script>
