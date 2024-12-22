<template>
  <div class="flex flex-row h-full">
    <!-- Left Side: Controls -->
    <div class="w-1/3 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Ideogram v2</h2>
        
        <!-- Prompt Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prompt
          </label>
          <textarea
            v-model="imagePrompt"
            rows="4"
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Describe your image..."
          ></textarea>
        </div>

        <!-- Negative Prompt -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Negative Prompt
          </label>
          <textarea
            v-model="negativePrompt"
            rows="2"
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="What to avoid in the image..."
          ></textarea>
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Style Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <select
              v-model="style"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="auto">Auto</option>
              <option value="general">General</option>
              <option value="realistic">Realistic</option>
              <option value="design">Design</option>
              <option value="render_3D">3D Render</option>
              <option value="anime">Anime</option>
            </select>
          </div>

          <!-- Aspect Ratio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aspect Ratio
            </label>
            <select
              v-model="aspectRatio"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="1:1">Square (1:1)</option>
              <option value="16:9">Landscape (16:9)</option>
              <option value="9:16">Portrait (9:16)</option>
              <option value="4:3">Standard (4:3)</option>
              <option value="3:4">Portrait (3:4)</option>
              <option value="16:10">Widescreen (16:10)</option>
              <option value="10:16">Tall (10:16)</option>
              <option value="3:2">Photo (3:2)</option>
              <option value="2:3">Portrait Photo (2:3)</option>
              <option value="3:1">Panorama (3:1)</option>
              <option value="1:3">Vertical Panorama (1:3)</option>
            </select>
          </div>

          <!-- Seed Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seed (Optional)
            </label>
            <input
              v-model="seed"
              type="number"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Random if empty"
            />
          </div>

          <!-- Expand Prompt Toggle -->
          <div class="flex items-center space-x-3 pt-8">
            <input
              v-model="expandPrompt"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Expand Prompt (MagicPrompt)
            </label>
          </div>
        </div>

        <!-- Generate Button -->
        <button
          @click="generateImage"
          class="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 transition-all duration-300 disabled:opacity-50"
          :disabled="isGenerating"
        >
          <span v-if="isGenerating" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
          <span v-else>Generate</span>
        </button>
      </div>
    </div>

    <!-- Right Side: Image Preview -->
    <div class="w-2/3 p-4 h-full">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-[calc(100vh-2rem)] flex flex-col">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Preview</h2>
        
        <!-- Generation Status -->
        <div v-if="currentGenerationId" class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin mx-auto mb-4 w-16 h-16 text-blue-500">
              <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p class="text-lg text-gray-500 dark:text-gray-400">Generating your masterpiece...</p>
          </div>
        </div>

        <!-- Generated Image -->
        <div v-else-if="generatedImage" class="flex-1 flex flex-col">
          <div class="flex-1 relative mb-4">
            <img 
              :src="generatedImage" 
              alt="Generated image" 
              class="absolute inset-0 w-full h-full object-contain rounded-lg shadow-lg"
            >
          </div>
          <div class="flex gap-4 mt-4">
            <button
              @click="saveImage"
              :disabled="isSaving"
              class="flex-1 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSaving">Saving...</span>
              <span v-else>Save to Gallery</span>
            </button>
            <button
              @click="downloadImage"
              class="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
            >
              Download Image
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center text-gray-500 dark:text-gray-400">
            <p class="text-lg">Your generated image will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useUser } from '@clerk/vue'

const supabase = useSupabase()
const { user: clerkUser, isSignedIn } = useUser()
const imagePrompt = ref('')
const negativePrompt = ref('')
const style = ref('auto')
const aspectRatio = ref('1:1')
const seed = ref('')
const expandPrompt = ref(true)
const isGenerating = ref(false)
const currentGenerationId = ref(null)
const generatedImage = ref(null)
const isSaving = ref(false)

// Get current user
onMounted(async () => {
  console.log('IdeogramGenerator mounted')
  console.log('Current Clerk user:', clerkUser.value)
})

const generateImage = async () => {
  if (!imagePrompt.value) return
  
  try {
    currentGenerationId.value = null
    generatedImage.value = null
    isGenerating.value = true
    
    // Prepare request body
    const requestBody = {
      prompt: imagePrompt.value,
      aspect_ratio: aspectRatio.value,
      expand_prompt: expandPrompt.value,
      style: style.value
    }

    // Add optional parameters if they are set
    if (negativePrompt.value) {
      requestBody.negative_prompt = negativePrompt.value
    }
    if (seed.value) {
      requestBody.seed = parseInt(seed.value)
    }

    // Initial generation request
    const response = await fetch('https://queue.fal.run/fal-ai/ideogram/v2', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Generation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Generation response:', data);
    currentGenerationId.value = data.request_id;
    
  } catch (error) {
    console.error('Error starting generation:', error);
    alert('Error: ' + error.message);
    isGenerating.value = false;
  }
}

const checkGenerationStatus = async () => {
  if (!currentGenerationId.value) return;
  
  try {
    const response = await fetch(`https://queue.fal.run/fal-ai/ideogram/requests/${currentGenerationId.value}/status`, {
      headers: {
        'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`);
    }

    const status = await response.json();
    console.log('Status check:', status);

    if (status.status === 'COMPLETED') {
      // Get the result
      const resultResponse = await fetch(`https://queue.fal.run/fal-ai/ideogram/requests/${currentGenerationId.value}`, {
        headers: {
          'Authorization': `Key ${import.meta.env.VITE_FAL_AI_KEY}`
        }
      });

      if (!resultResponse.ok) {
        throw new Error(`Failed to get result: ${resultResponse.status}`);
      }

      const result = await resultResponse.json();
      console.log('Result:', result);
      
      if (result.images && result.images.length > 0 && result.images[0].url) {
        generatedImage.value = result.images[0].url;
        currentGenerationId.value = null; // Clear ID after successful fetch
        isGenerating.value = false;
      } else {
        throw new Error('No image URL in response');
      }
    }
  } catch (error) {
    console.error('Error checking status:', error);
    isGenerating.value = false;
  }
}

const downloadImage = async () => {
  if (!generatedImage.value) return;
  
  try {
    // Fetch the image
    const response = await fetch(generatedImage.value);
    const blob = await response.blob();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Error downloading image: ' + error.message);
  }
}

const saveImage = async () => {
  if (!generatedImage.value || isSaving.value) return;
  
  try {
    // 1. Check authentication
    if (!isSignedIn.value || !clerkUser.value) {
      alert('Please sign in to save images');
      return;
    }
    
    isSaving.value = true;
    console.log('Starting image save process...');
    
    // 2. Get Supabase client
    const supabase = useSupabase();
    if (!supabase) {
      throw new Error('Failed to get Supabase client');
    }
    
    // 3. Fetch the image as blob
    console.log('Fetching image...');
    const response = await fetch(generatedImage.value);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    const blob = await response.blob();
    console.log('Image fetched, size:', blob.size);
    
    // 4. Upload to storage
    console.log('Uploading to storage...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${clerkUser.value.id}/${timestamp}.png`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(filename, blob, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }
    
    console.log('Upload successful:', uploadData);

    // 5. Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('images')
      .getPublicUrl(filename);
      
    console.log('Public URL:', publicUrl);

    // 6. Save metadata
    console.log('Saving metadata...');
    const imageData = {
      clerk_user_id: clerkUser.value.id,
      image_url: publicUrl,
      prompt: imagePrompt.value || '',
      negative_prompt: negativePrompt.value || null,
      style: style.value || 'default',
      aspect_ratio: aspectRatio.value || '1:1',
      seed: seed.value ? parseInt(seed.value) : null,
      expand_prompt: expandPrompt.value === true,
      model: 'ideogram-v2'
    };

    const { data: savedImage, error: saveError } = await supabase
      .from('generated_images')
      .insert([imageData])
      .select();

    if (saveError) {
      console.error('Metadata save failed:', saveError);
      
      // Try to clean up the uploaded file
      try {
        await supabase.storage.from('images').remove([filename]);
        console.log('Cleaned up storage file after failed metadata save');
      } catch (cleanupError) {
        console.error('Failed to clean up storage file:', cleanupError);
      }
      
      throw new Error(`Metadata save failed: ${saveError.message}`);
    }

    console.log('Image saved successfully:', savedImage);
    alert('Image saved successfully!');
    
  } catch (error) {
    console.error('Save failed:', error);
    alert(`Error: ${error.message}`);
  } finally {
    isSaving.value = false;
  }
};

// Watch for generation ID changes and start checking status
watch(currentGenerationId, (newId) => {
  if (newId) {
    // Start polling when we have an ID
    const interval = setInterval(async () => {
      if (!currentGenerationId.value) {
        clearInterval(interval);
        return;
      }
      await checkGenerationStatus();
    }, 1000);

    // Clear interval after 2 minutes max
    setTimeout(() => {
      clearInterval(interval);
      if (currentGenerationId.value) {
        currentGenerationId.value = null;
        isGenerating.value = false;
        console.log('Generation timed out');
      }
    }, 120000);
  }
});
</script>
