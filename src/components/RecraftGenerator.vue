<template>
  <div class="flex flex-row h-full">
    <!-- Left Side: Controls -->
    <div class="w-1/3 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recraft AI</h2>
        
        <!-- Form -->
        <form @submit.prevent="generateImage" class="space-y-6">
          <!-- Prompt Input -->
          <div>
            <label for="prompt" class="block text-sm font-medium text-gray-900 dark:text-gray-300">Prompt</label>
            <textarea
              id="prompt"
              v-model="imagePrompt"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your image prompt..."
              required
            ></textarea>
          </div>

          <!-- Negative Prompt -->
          <div>
            <label for="negative-prompt" class="block text-sm font-medium text-gray-900 dark:text-gray-300">Negative Prompt</label>
            <textarea
              id="negative-prompt"
              v-model="negativePrompt"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="What you don't want in the image..."
            ></textarea>
          </div>

          <!-- Style Selection -->
          <div>
            <label for="style" class="block text-sm font-medium text-gray-900 dark:text-gray-300">Style</label>
            <select
              id="style"
              v-model="style"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option v-for="option in styleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Image Size -->
          <div>
            <label for="image-size" class="block text-sm font-medium text-gray-900 dark:text-gray-300">Image Size</label>
            <select
              id="image-size"
              v-model="imageSize"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option v-for="option in imageSizeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

          <!-- Generate Button -->
          <button
            type="submit"
            :disabled="isGenerating || !imagePrompt"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isGenerating" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
            <span v-else>Generate Image</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Right Side: Image Preview -->
    <div class="w-2/3 p-4 h-full">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-[calc(100vh-2rem)] flex flex-col">
        <div class="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
          <div v-if="isGenerating" class="flex flex-col items-center justify-center text-gray-500">
            <svg class="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Generating your image...</p>
          </div>
          <div v-else-if="generatedImage" class="w-full h-full flex flex-col items-center justify-center">
            <img :src="generatedImage" alt="Generated image" class="max-w-full max-h-[calc(100%-60px)] object-contain" />
            <button
              @click="downloadImage"
              class="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Icon icon="mdi:download" class="w-5 h-5 mr-2" />
              Download Image
            </button>
          </div>
          <div v-else class="flex flex-col items-center justify-center text-gray-500">
            <Icon icon="mdi:image" class="w-16 h-16 mb-4" />
            <p>Your generated image will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

// Form inputs
const imagePrompt = ref('')
const negativePrompt = ref('')
const error = ref(null)
const isGenerating = ref(false)
const generatedImage = ref(null)
const currentGenerationId = ref(null)

// Style options
const styleOptions = ref([
  { value: 'any', label: 'Any Style' },
  { value: 'realistic_image', label: 'Realistic' },
  { value: 'realistic_image/b_and_w', label: 'Realistic - Black & White' },
  { value: 'realistic_image/hard_flash', label: 'Realistic - Hard Flash' },
  { value: 'realistic_image/hdr', label: 'Realistic - HDR' },
  { value: 'realistic_image/long_exposure', label: 'Realistic - Long Exposure' },
  { value: 'realistic_image/macro', label: 'Realistic - Macro' },
  { value: 'digital_illustration', label: 'Digital Illustration' },
  { value: 'digital_illustration/pixel_art', label: 'Digital - Pixel Art' },
  { value: 'digital_illustration/hand_drawn', label: 'Digital - Hand Drawn' },
  { value: 'digital_illustration/grain', label: 'Digital - Grain' },
  { value: 'digital_illustration/infantile_sketch', label: 'Digital - Infantile Sketch' },
  { value: 'digital_illustration/2d_art_poster', label: 'Digital - 2D Art Poster' },
  { value: 'digital_illustration/handmade_3d', label: 'Digital - Handmade 3D' },
  { value: 'vector_illustration', label: 'Vector Illustration' },
  { value: 'vector_illustration/flat', label: 'Vector - Flat' },
  { value: 'vector_illustration/isometric', label: 'Vector - Isometric' },
  { value: 'vector_illustration/line_art', label: 'Vector - Line Art' },
  { value: 'vector_illustration/low_poly', label: 'Vector - Low Poly' },
  { value: 'vector_illustration/geometric', label: 'Vector - Geometric' }
])

// Image size options
const imageSizeOptions = ref([
  { value: 'square_hd', label: 'Square HD' },
  { value: 'square', label: 'Square' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' }
])

// Form values
const style = ref('any')
const imageSize = ref('square_hd')

const generateImage = async () => {
  if (!imagePrompt.value || isGenerating.value) return
  
  try {
    currentGenerationId.value = null
    generatedImage.value = null
    isGenerating.value = true
    error.value = null
    
    if (!import.meta.env.VITE_FAL_AI_KEY) {
      throw new Error('FAL AI key not found. Please check your environment variables.')
    }

    console.log('Starting image generation...')
    const requestBody = {
      prompt: imagePrompt.value,
      negative_prompt: negativePrompt.value || undefined,
      style: style.value === 'any' ? undefined : style.value,
      image_size: imageSize.value
    }
    console.log('Request body:', requestBody)

    const response = await fetch('https://queue.fal.run/fal-ai/recraft-v3', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`Generation failed: ${response.status}`)
    }

    const data = await response.json()
    console.log('Generation response:', data)
    currentGenerationId.value = data.request_id
  } catch (e) {
    console.error('Generation error:', e)
    error.value = e.message || 'Failed to start image generation. Please try again.'
    isGenerating.value = false
  }
}

const downloadImage = async () => {
  if (!generatedImage.value) return
  
  try {
    // Fetch the image
    const response = await fetch(generatedImage.value)
    const blob = await response.blob()
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recraft-${Date.now()}.png` // Generate unique filename
    document.body.appendChild(a)
    a.click()
    
    // Cleanup
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (e) {
    console.error('Download error:', e)
    error.value = 'Failed to download image. Please try again.'
  }
}

const checkGenerationStatus = async () => {
  if (!currentGenerationId.value) return
  
  try {
    const response = await fetch(`https://queue.fal.run/fal-ai/recraft-v3/requests/${currentGenerationId.value}/status`, {
      headers: {
        'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`)
    }

    const status = await response.json()
    console.log('Status check:', status)

    if (status.status === 'COMPLETED') {
      // Get the result
      const resultResponse = await fetch(`https://queue.fal.run/fal-ai/recraft-v3/requests/${currentGenerationId.value}`, {
        headers: {
          'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
        }
      })

      if (!resultResponse.ok) {
        throw new Error(`Failed to get result: ${resultResponse.status}`)
      }

      const result = await resultResponse.json()
      console.log('Result:', result)
      
      if (result.images && result.images.length > 0 && result.images[0].url) {
        generatedImage.value = result.images[0].url
        currentGenerationId.value = null // Clear ID after successful fetch
        isGenerating.value = false
      } else {
        throw new Error('No image URL in response')
      }
    } else if (status.status === 'FAILED') {
      error.value = 'Image generation failed. Please try again.'
      currentGenerationId.value = null
      isGenerating.value = false
    } else {
      // Still processing, check again in 1 second
      setTimeout(checkGenerationStatus, 1000)
    }
  } catch (e) {
    console.error('Status check error:', e)
    error.value = 'Failed to check generation status. Please try again.'
    currentGenerationId.value = null
    isGenerating.value = false
  }
}

// Watch for generation ID changes and start checking status
watch(currentGenerationId, (newId) => {
  if (newId) {
    // Start polling when we have an ID
    checkGenerationStatus()
  }
})
</script>
