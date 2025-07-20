<template>
  <div class="not-found-container">
    <h1 class="not-found-title">404 - Page Not Found</h1>
    <p class="not-found-message">
      The page you are looking for does not exist.
    </p>
    <router-link to="/">
      <Button label="Go to Home" icon="pi pi-home" class="p-button-text" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import Button from 'primevue/button'
</script>

<style scoped>
  .not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }

  .not-found-title {
    font-size: 3em;
    color: #ef4444; /* Tailwind's red-500 */
    margin-bottom: 15px;
  }

  .not-found-message {
    font-size: 1.2em;
    color: #6b7280; /* Tailwind's gray-500 */
    margin-bottom: 30px;
  }
</style>
