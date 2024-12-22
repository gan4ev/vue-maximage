<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0F]/80 backdrop-blur-lg border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <Icon icon="heroicons:photo" class="h-6 w-6 text-purple-500" />
          <span class="text-xl font-bold text-white">MaxImages</span>
        </RouterLink>

        <!-- Menu Items -->
        <div class="hidden md:flex items-center space-x-6">
          <RouterLink v-for="item in menuItems" :key="item.name" 
             :to="item.href"
             class="text-base font-medium text-white hover:text-purple-400 transition-colors duration-200">
            {{ $t(`menu.${item.name.toLowerCase()}`) }}
          </RouterLink>
        </div>

        <!-- Auth and CTA Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          
          <SignOutButton v-if="isSignedIn">
            <button class="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              {{ $t('menu.signOut') }}
            </button>
          </SignOutButton>

          <template v-if="isSignedIn">
            <RouterLink 
              to="/dashboard"
              class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 
                     transition-all duration-200">
              {{ $t('menu.startCreating') }}
            </RouterLink>
          </template>
          <template v-else>
            <SignInButton mode="modal">
              <button class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 
                       transition-all duration-200">
                {{ $t('menu.startCreating') }}
              </button>
            </SignInButton>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden text-gray-300 hover:text-white"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon v-if="!mobileMenuOpen" icon="heroicons:bars-3" class="h-6 w-6" />
          <Icon v-else icon="heroicons:x-mark" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen"
      class="md:hidden bg-[#0D0D0F] border-t border-white/10"
    >
      <div class="px-4 pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.href"
          class="block px-3 py-2 text-base font-medium text-white hover:text-purple-400 transition-colors duration-200"
        >
          {{ $t(`menu.${item.name.toLowerCase()}`) }}
        </RouterLink>
      </div>
      <div class="px-4 py-3 border-t border-white/10">
        <SignOutButton v-if="isSignedIn">
          <button class="w-full text-left px-3 py-2 text-base font-medium text-white hover:text-purple-400 transition-colors duration-200">
            {{ $t('menu.signOut') }}
          </button>
        </SignOutButton>
        
        <template v-if="isSignedIn">
          <RouterLink 
            to="/dashboard"
            class="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-purple-400 transition-colors duration-200">
            {{ $t('menu.startCreating') }}
          </RouterLink>
        </template>
        <template v-else>
          <SignInButton mode="modal">
            <button class="w-full text-left px-3 py-2 text-base font-medium text-white hover:text-purple-400 transition-colors duration-200">
              {{ $t('menu.startCreating') }}
            </button>
          </SignInButton>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { SignInButton, SignOutButton, useAuth } from '@clerk/vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const { isSignedIn } = useAuth()

const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]
</script>
