<template>
  <div class="min-h-screen bg-[#0D0D0F] p-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold text-white mb-6">Dashboard</h1>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto">
      <div class="flex h-[calc(100vh-12rem)]">
        <!-- Left Menu -->
        <div class="w-64 flex-shrink-0">
          <LeftMenu @modelSelected="handleModelChange" />
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 ml-6 overflow-auto">
          <!-- Generator -->
          <div v-if="currentModel === 'ideogram'">
            <IdeogramGenerator />
          </div>
          
          <!-- Image Gallery -->
          <div v-else-if="currentModel === 'gallery'" class="pb-8">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p class="mt-4 text-gray-600 dark:text-gray-400">Loading your images...</p>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-8">
              <p class="text-red-600 dark:text-red-200">{{ error }}</p>
            </div>
            
            <!-- No Images -->
            <div v-else-if="!images.length" class="text-center py-8">
              <p class="text-gray-600 dark:text-gray-400">No images generated yet. Try creating some!</p>
              <button 
                @click="currentModel = 'ideogram'"
                class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate Images
              </button>
            </div>
            
            <!-- Image Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="image in images" 
                :key="image.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <!-- Image -->
                <img 
                  :src="image.image_url" 
                  :alt="image.prompt"
                  class="w-full h-64 object-cover cursor-pointer"
                  @click="openModal(image)"
                />
                
                <!-- Image Info -->
                <div class="p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {{ formatDate(image.created_at) }}
                  </p>
                  <p class="text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {{ image.prompt }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                      {{ image.style }}
                    </span>
                    <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                      {{ image.aspect_ratio }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Other Models -->
          <div v-else class="flex items-center justify-center h-full">
            <p class="text-lg text-gray-500">Select a model to get started</p>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Image Modal -->
    <div 
      v-if="selectedImage"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="selectedImage = null"
    >
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full overflow-hidden"
        @click.stop
      >
        <img 
          :src="selectedImage.image_url" 
          :alt="selectedImage.prompt"
          class="w-full h-auto"
        />
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Image Details
          </h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-700 dark:text-gray-300">Prompt</h4>
              <p class="text-gray-900 dark:text-white">{{ selectedImage.prompt }}</p>
            </div>
            <div v-if="selectedImage.negative_prompt">
              <h4 class="font-medium text-gray-700 dark:text-gray-300">Negative Prompt</h4>
              <p class="text-gray-900 dark:text-white">{{ selectedImage.negative_prompt }}</p>
            </div>
            <div class="flex flex-wrap gap-4">
              <div>
                <h4 class="font-medium text-gray-700 dark:text-gray-300">Style</h4>
                <p class="text-gray-900 dark:text-white">{{ selectedImage.style }}</p>
              </div>
              <div>
                <h4 class="font-medium text-gray-700 dark:text-gray-300">Aspect Ratio</h4>
                <p class="text-gray-900 dark:text-white">{{ selectedImage.aspect_ratio }}</p>
              </div>
              <div v-if="selectedImage.seed">
                <h4 class="font-medium text-gray-700 dark:text-gray-300">Seed</h4>
                <p class="text-gray-900 dark:text-white">{{ selectedImage.seed }}</p>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                @click="selectedImage = null"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useSupabase } from '@/composables/useSupabase'
import { useAuth } from '@clerk/vue'
import LeftMenu from '../components/LeftMenu.vue'
import IdeogramGenerator from '../components/IdeogramGenerator.vue'

const { isSignedIn, user: clerkUser } = useAuth()
const supabase = useSupabase()

const currentModel = ref('ideogram')
const images = ref([])
const loading = ref(false)
const error = ref(null)
const selectedImage = ref(null)

const handleModelChange = (modelId) => {
  currentModel.value = modelId
  if (modelId === 'gallery') {
    loadImages()
  }
}

const loadImages = async () => {
  if (!isSignedIn.value || !clerkUser.value) {
    error.value = 'Please sign in to view your images'
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const { data, error: fetchError } = await supabase
      .from('generated_images')
      .select('*')
      .eq('clerk_user_id', clerkUser.value.id)
      .order('created_at', { ascending: false })
    
    if (fetchError) throw fetchError
    
    images.value = data
  } catch (e) {
    console.error('Failed to load images:', e)
    error.value = 'Failed to load your images. Please try again later.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const openModal = (image) => {
  selectedImage.value = image
}

// Watch for auth changes
watch(isSignedIn, (newValue) => {
  if (newValue && currentModel.value === 'gallery') {
    loadImages()
  }
})

// Initial load if on gallery
onMounted(() => {
  if (currentModel.value === 'gallery') {
    loadImages()
  }
})
</script>
