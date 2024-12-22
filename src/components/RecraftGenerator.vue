<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div class="flex flex-col lg:flex-row">
      <!-- Left Panel: Controls -->
      <div class="w-full lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recraft Generator</h2>
        
        <!-- Form -->
        <div class="space-y-6">
          <!-- Prompt -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prompt
            </label>
            <textarea
              v-model="imagePrompt"
              rows="4"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Describe the image you want to generate..."
            ></textarea>
          </div>

          <!-- Negative Prompt -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Negative Prompt
            </label>
            <textarea
              v-model="negativePrompt"
              rows="2"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Describe what you don't want in the image..."
            ></textarea>
          </div>

          <!-- Style -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <select
              v-model="style"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option v-for="styleOption in styleOptions" :key="styleOption.value" :value="styleOption.value">
                {{ styleOption.label }}
              </option>
            </select>
          </div>

          <!-- Aspect Ratio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Size
            </label>
            <select
              v-model="aspectRatio"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option v-for="aspectRatioOption in aspectRatioOptions" :key="aspectRatioOption.value" :value="aspectRatioOption.value">
                {{ aspectRatioOption.label }}
              </option>
            </select>
          </div>

          <!-- Seed -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seed
              <span class="text-xs text-gray-500">(optional)</span>
            </label>
            <div class="flex space-x-2">
              <input
                v-model="seed"
                type="number"
                class="flex-1 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter a seed number..."
              />
              <button
                @click="seed = Math.floor(Math.random() * 1000000)"
                class="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                title="Generate random seed"
              >
                <Icon icon="heroicons:arrow-path" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Generate Button -->
          <button
            @click="generateImage"
            :disabled="isGenerating || !imagePrompt"
            class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium 
                   hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-indigo-500
                   transition-all duration-200"
          >
            <span>{{ isGenerating ? 'Generating...' : 'Generate Image' }}</span>
          </button>

          <!-- Error Message -->
          <div v-if="error" class="text-red-500 text-sm mt-2">
            {{ error }}
          </div>
        </div>
      </div>

      <!-- Right Panel: Preview -->
      <div class="w-full lg:w-2/3 p-6">
        <!-- Loading State -->
        <div 
          v-if="isGenerating" 
          class="h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg"
        >
          <div class="text-center">
            <div class="relative w-32 h-32">
              <div class="absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
              <div class="absolute inset-4 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin-reverse"></div>
              <div class="absolute inset-8 rounded-full border-t-2 border-b-2 border-purple-500 animate-spin"></div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mt-4">Creating your masterpiece...</p>
            <p class="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        </div>

        <!-- Generated Image -->
        <div v-else-if="generatedImage" class="space-y-6">
          <div class="relative aspect-square">
            <img
              :src="generatedImage"
              alt="Generated image"
              class="w-full h-full object-contain rounded-lg shadow-lg"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button
              @click="downloadImage"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div class="flex items-center">
                <Icon icon="heroicons:arrow-down-tray" class="w-5 h-5 mr-2" />
                Download
              </div>
            </button>
            <button
              @click="saveImage"
              :disabled="isSaving"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition-colors duration-200"
            >
              <div class="flex items-center">
                <Icon icon="heroicons:cloud-upload" class="w-5 h-5 mr-2" />
                <span v-if="isSaving">Saving...</span>
                <span v-else>Save to Gallery</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg text-gray-400 dark:text-gray-600"
        >
          <div class="text-center">
            <Icon icon="heroicons:photo" class="w-16 h-16 mx-auto mb-4" />
            <p>Generated image will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useSupabase } from '../composables/useSupabase'
import { useUser } from '@clerk/vue'

const supabase = useSupabase()
const { user: clerkUser, isSignedIn } = useUser()

const aspectRatioOptions = [
  { value: 'square_hd', label: 'Square HD' },
  { value: 'square', label: 'Square' },
  { value: 'portrait_4_3', label: 'Portrait 4:3' },
  { value: 'portrait_16_9', label: 'Portrait 16:9' },
  { value: 'landscape_4_3', label: 'Landscape 4:3' },
  { value: 'landscape_16_9', label: 'Landscape 16:9' }
]

const styleOptions = [
  { value: 'realistic_image', label: 'Realistic' },
  { value: 'realistic_image/b_and_w', label: 'Black & White' },
  { value: 'realistic_image/hard_flash', label: 'Hard Flash' },
  { value: 'realistic_image/hdr', label: 'HDR' },
  { value: 'realistic_image/natural_light', label: 'Natural Light' },
  { value: 'realistic_image/studio_portrait', label: 'Studio Portrait' },
  { value: 'realistic_image/enterprise', label: 'Enterprise' },
  { value: 'realistic_image/motion_blur', label: 'Motion Blur' },
  { value: 'digital_illustration', label: 'Digital Illustration' },
  { value: 'digital_illustration/pixel_art', label: 'Pixel Art' },
  { value: 'digital_illustration/hand_drawn', label: 'Hand Drawn' },
  { value: 'digital_illustration/grain', label: 'Grain' },
  { value: 'digital_illustration/infantile_sketch', label: 'Infantile Sketch' },
  { value: 'digital_illustration/2d_art_poster', label: '2D Art Poster' },
  { value: 'digital_illustration/handmade_3d', label: 'Handmade 3D' },
  { value: 'digital_illustration/hand_drawn_outline', label: 'Hand Drawn Outline' },
  { value: 'digital_illustration/engraving_color', label: 'Engraving Color' },
  { value: 'digital_illustration/2d_art_poster_2', label: '2D Art Poster 2' },
  { value: 'vector_illustration', label: 'Vector Illustration' },
  { value: 'vector_illustration/engraving', label: 'Vector Engraving' },
  { value: 'vector_illustration/line_art', label: 'Vector Line Art' },
  { value: 'vector_illustration/line_circuit', label: 'Vector Line Circuit' },
  { value: 'vector_illustration/linocut', label: 'Vector Linocut' }
]

const imagePrompt = ref('')
const negativePrompt = ref('')
const style = ref('realistic_image')
const aspectRatio = ref('square_hd')
const seed = ref(Math.floor(Math.random() * 1000000))
const isGenerating = ref(false)
const currentGenerationId = ref(null)
const generatedImage = ref(null)
const isSaving = ref(false)
const error = ref(null)

// Get current user
onMounted(async () => {
  console.log('RecraftGenerator mounted')
  console.log('Current Clerk user:', clerkUser.value)
})

const generateImage = async () => {
  if (!imagePrompt.value || isGenerating.value) return
  
  isGenerating.value = true
  error.value = null
  generatedImage.value = null
  currentGenerationId.value = null
  
  try {
    if (!import.meta.env.VITE_FAL_AI_KEY) {
      throw new Error('FAL AI key not found. Please check your environment variables.')
    }

    console.log('Starting image generation...')
    const requestBody = {
      prompt: imagePrompt.value,
      negative_prompt: negativePrompt.value || undefined
    }
    console.log('Request body:', requestBody)

    const response = await fetch('https://queue.fal.run/fal-ai/recraft-v3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()
    console.log('API Response:', data)

    if (!response.ok) {
      throw new Error(`Failed to start image generation: ${data.error || response.statusText}`)
    }

    currentGenerationId.value = data.request_id
    console.log('Generation started with ID:', currentGenerationId.value)
    checkGenerationStatus()
  } catch (e) {
    console.error('Generation error:', e)
    error.value = e.message || 'Failed to start image generation. Please try again.'
    isGenerating.value = false
  }
}

const checkGenerationStatus = async () => {
  if (!currentGenerationId.value) return

  try {
    console.log('Checking status for ID:', currentGenerationId.value)
    const response = await fetch(`https://queue.fal.run/fal-ai/recraft-v3/requests/${currentGenerationId.value}/status`, {
      headers: {
        'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to check generation status')
    }

    const status = await response.json()
    console.log('Status response:', status)

    if (status.status === 'COMPLETED') {
      // Get the result
      const resultResponse = await fetch(`https://queue.fal.run/fal-ai/recraft-v3/requests/${currentGenerationId.value}`, {
        headers: {
          'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
        }
      });

      if (!resultResponse.ok) {
        throw new Error('Failed to fetch generation result')
      }

      const result = await resultResponse.json()
      console.log('Result response:', result)
      
      if (!result.images || !result.images[0]?.url) {
        throw new Error('No image URL in response')
      }

      generatedImage.value = result.images[0].url
      currentGenerationId.value = null
      isGenerating.value = false

      // Save to Supabase if user is signed in
      if (isSignedIn.value && clerkUser.value) {
        const { error: uploadError } = await supabase
          .from('images')
          .insert({
            clerk_user_id: clerkUser.value.id,
            prompt: imagePrompt.value,
            negative_prompt: negativePrompt.value,
            style: style.value,
            aspect_ratio: aspectRatio.value,
            seed: seed.value,
            url: result.images[0].url,
            model: 'recraft'
          })

        if (uploadError) {
          console.error('Failed to save image:', uploadError)
          error.value = 'Image generated but failed to save to gallery.'
        }
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

const downloadImage = async () => {
  if (!generatedImage.value) return

  try {
    const response = await fetch(generatedImage.value)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recraft-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}

const saveImage = async () => {
  if (!generatedImage.value || !clerkUser.value || isSaving.value) return
  
  isSaving.value = true
  
  try {
    // First, fetch the image and convert to blob
    const response = await fetch(generatedImage.value)
    const blob = await response.blob()
    
    // Create a File object from the blob
    const file = new File([blob], `recraft-${Date.now()}.png`, { type: 'image/png' })
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(`${clerkUser.value.id}/${file.name}`, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(uploadData.path)

    // Save metadata to database
    const { error: dbError } = await supabase
      .from('images')
      .insert({
        clerk_user_id: clerkUser.value.id,
        prompt: imagePrompt.value,
        negative_prompt: negativePrompt.value,
        style: style.value,
        aspect_ratio: aspectRatio.value,
        seed: seed.value,
        model: 'recraft-v3',
        url: publicUrl
      })

    if (dbError) throw dbError

    console.log('Image saved successfully')
  } catch (error) {
    console.error('Error saving image:', error)
  } finally {
    isSaving.value = false
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
