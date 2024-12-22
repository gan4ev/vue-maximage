<template>
  <div class="min-h-screen bg-[#0D0D0F]">
    <MainNavigation />
    <!-- Main Content -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import MainNavigation from './components/MainNavigation.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #0D0D0F;
}
</style>
