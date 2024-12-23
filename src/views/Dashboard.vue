<template>
  <div class="min-h-screen bg-[#0D0D0F] pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Main Content -->
      <div class="flex flex-col md:flex-row">
        <!-- Left Menu -->
        <div class="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
          <LeftMenu @modelSelected="handleModelChange" />
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 md:ml-6">
          <!-- Generator -->
          <div v-if="currentModel === 'ideogram'">
            <IdeogramGenerator />
          </div>

          <div v-else-if="currentModel === 'recraft'">
            <RecraftGenerator />
          </div>
          
          <div v-else-if="currentModel === 'gallery'" class="pb-8">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p class="mt-4 text-gray-400">Loading your images...</p>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="bg-red-500/10 p-4 rounded-lg mb-8">
              <p class="text-red-400">{{ error }}</p>
            </div>
            
            <!-- No Images -->
            <div v-else-if="!images.length" class="text-center py-8">
              <p class="text-gray-400">No images generated yet. Try creating some!</p>
              <button 
                @click="currentModel = 'ideogram'"
                class="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 
                       transition-all duration-200"
              >
                Generate Images
              </button>
            </div>
            
            <!-- Image Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="image in images" 
                :key="image.id"
                class="bg-white/5 rounded-xl overflow-hidden border border-white/10"
              >
                <!-- Image Card Content -->
                <div class="aspect-square relative">
                  <img 
                    :src="image.image_url" 
                    :alt="image.prompt"
                    class="w-full h-full object-cover cursor-pointer"
                    @click="openModal(image)"
                  />
                </div>
                <div class="p-4">
                  <p class="text-sm text-gray-400 mb-2">{{ formatDate(image.created_at) }}</p>
                  <p class="text-white">{{ image.prompt }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 text-xs bg-white/5 rounded-full text-gray-300">
                      {{ image.style }}
                    </span>
                    <span class="px-2 py-1 text-xs bg-white/5 rounded-full text-gray-300">
                      {{ image.aspect_ratio }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Image Modal -->
  <div 
    v-if="selectedImage"
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    @click="selectedImage = null"
  >
    <div 
      class="bg-[#0D0D0F] rounded-2xl max-w-4xl w-full overflow-hidden border border-white/10"
      @click.stop
    >
      <div class="relative">
        <img 
          :src="selectedImage.image_url" 
          :alt="selectedImage.prompt"
          class="w-full h-auto"
        />
        <button 
          class="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 
                 rounded-full p-2 transition-colors duration-200"
          @click="selectedImage = null"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-white mb-4">
          Image Details
        </h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-300">Prompt</h4>
            <p class="text-white">{{ selectedImage.prompt }}</p>
          </div>
          <div v-if="selectedImage.negative_prompt">
            <h4 class="font-medium text-gray-300">Negative Prompt</h4>
            <p class="text-white">{{ selectedImage.negative_prompt }}</p>
          </div>
          <div class="flex flex-wrap gap-4">
            <div>
              <h4 class="font-medium text-gray-300">Style</h4>
              <p class="text-white">{{ selectedImage.style }}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-300">Aspect Ratio</h4>
              <p class="text-white">{{ selectedImage.aspect_ratio }}</p>
            </div>
            <div v-if="selectedImage.seed">
              <h4 class="font-medium text-gray-300">Seed</h4>
              <p class="text-white">{{ selectedImage.seed }}</p>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <button
              class="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-200"
              @click="selectedImage = null"
            >
              Close
            </button>
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
import MainNavigation from '../components/MainNavigation.vue'
import LeftMenu from '../components/LeftMenu.vue'
import IdeogramGenerator from '../components/IdeogramGenerator.vue'
import RecraftGenerator from '../components/RecraftGenerator.vue'

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
      .from('images')
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
