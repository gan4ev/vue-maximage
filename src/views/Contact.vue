<template>
  <div class="min-h-screen flex flex-col">
    <MainNavigation />
    <main class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-screen-xl mx-auto px-6 lg:px-8 grid grid-cols-2 gap-8 items-center">
        <!-- Left side - Contact Info -->
        <div class="space-y-6">
          <div>
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {{ $t('contact.title') }}
            </h2>
            <p class="mt-4 text-lg leading-8 text-gray-300">
              {{ $t('contact.subtitle') }}
            </p>
          </div>
          
          <!-- Additional contact info -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-white/5">
                <Icon icon="heroicons:envelope" class="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 class="text-sm font-medium text-white">Email</h3>
                <p class="text-sm text-gray-300">support@maximage.ai</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-white/5">
                <Icon icon="heroicons:clock" class="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 class="text-sm font-medium text-white">Working Hours</h3>
                <p class="text-sm text-gray-300">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Contact Form -->
        <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl ring-1 ring-white/10">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <!-- Name -->
              <div class="form-group">
                <label for="name" class="block text-sm font-medium leading-6 text-white">
                  {{ $t('contact.form.name') }} <span class="text-red-500">*</span>
                </label>
                <div class="mt-1.5 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="heroicons:user" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    id="name"
                    required
                    :placeholder="$t('contact.form.namePlaceholder')"
                    class="block w-full rounded-md border-0 bg-white/5 pl-10 pr-3.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm"
                    :class="{ 'ring-red-500': errors.name }"
                  />
                  <p v-if="errors.name" class="mt-1 text-xs text-red-400">{{ errors.name }}</p>
                </div>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email" class="block text-sm font-medium leading-6 text-white">
                  {{ $t('contact.form.email') }} <span class="text-red-500">*</span>
                </label>
                <div class="mt-1.5 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="heroicons:envelope" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    id="email"
                    required
                    :placeholder="$t('contact.form.emailPlaceholder')"
                    class="block w-full rounded-md border-0 bg-white/5 pl-10 pr-3.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm"
                    :class="{ 'ring-red-500': errors.email }"
                  />
                  <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div class="form-group">
              <label for="subject" class="block text-sm font-medium leading-6 text-white">
                {{ $t('contact.form.subject') }}
              </label>
              <div class="mt-1.5 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="heroicons:chat-bubble-left-right" class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="form.subject"
                  type="text"
                  name="subject"
                  id="subject"
                  :placeholder="$t('contact.form.subjectPlaceholder')"
                  class="block w-full rounded-md border-0 bg-white/5 pl-10 pr-3.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label for="message" class="block text-sm font-medium leading-6 text-white">
                {{ $t('contact.form.message') }} <span class="text-red-500">*</span>
              </label>
              <div class="mt-1.5 relative">
                <div class="absolute top-2 left-3 pointer-events-none">
                  <Icon icon="heroicons:pencil-square" class="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  v-model="form.message"
                  name="message"
                  id="message"
                  rows="3"
                  required
                  :placeholder="$t('contact.form.messagePlaceholder')"
                  class="block w-full rounded-md border-0 bg-white/5 pl-10 pr-3.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm"
                  :class="{ 'ring-red-500': errors.message }"
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-xs text-red-400">{{ errors.message }}</p>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between gap-4">
              <div class="flex-1">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3.5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div class="flex items-center justify-center gap-2">
                    <Icon v-if="isSubmitting" icon="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
                    <span>{{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.send') }}</span>
                  </div>
                </button>
              </div>
              
              <!-- Success Message -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div v-if="showSuccess" class="flex-1 p-2 rounded-md bg-green-500/10 border border-green-500/20">
                  <div class="flex items-center gap-2">
                    <Icon icon="heroicons:check-circle" class="h-5 w-5 text-green-400 flex-shrink-0" />
                    <p class="text-sm text-green-400">{{ $t('contact.form.successMessage') }}</p>
                  </div>
                </div>
              </transition>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import MainNavigation from '../components/MainNavigation.vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('contact.form.nameRequired')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('contact.form.emailRequired')
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = t('contact.form.emailInvalid')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t('contact.form.messageRequired')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-group {
  position: relative;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.4);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
