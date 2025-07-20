<script setup lang="ts">
  // Removed HelloWorld import
  import { navigateTo } from './route'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <button @click="navigateTo('Home')">Go to Home</button>
    <button @click="navigateTo('Dashboard')">Go to Dashboard</button>
    <button @click="navigateTo('NotFound')">Go to NotFound</button>
    <router-view />
  </div>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
