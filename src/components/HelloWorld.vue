<script setup lang="ts">
  import { useCounterStore } from '../stores/counter'
  import { useUserStore } from '../stores/user'
  import {
    incrementCounter,
    decrementCounter,
    resetCounter,
    incrementCounterBy,
  } from '@/services/counterService'

  defineProps<{ msg: string }>()

  const counterStore = useCounterStore()
  const userStore = useUserStore()
  
  // 模拟登录
  const handleLogin = async () => {
    try {
      await userStore.login('test@example.com', 'password')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
</script>
<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <h2>Counter Store Demo</h2>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <p>Is Even: {{ counterStore.isEven ? 'Yes' : 'No' }}</p>

    <div class="button-group">
      <button type="button" @click="incrementCounter()">Increment</button>
      <button type="button" @click="decrementCounter()">Decrement</button>
      <button type="button" @click="resetCounter()">Reset</button>
      <button type="button" @click="incrementCounterBy(5)">+5</button>
    </div>
  </div>
  <div class="card">
    <h2>User Store Demo</h2>
    <p>User: {{ userStore.userName }}</p>
    <p>Email: {{ userStore.userEmail }}</p>
    <p>Logged In: {{ userStore.isLoggedIn ? 'Yes' : 'No' }}</p>
    <p>Loading: {{ userStore.loading ? 'Yes' : 'No' }}</p>

    <div class="button-group">
      <button type="button" @click="handleLogin" :disabled="userStore.loading">
        {{ userStore.loading ? 'Logging in...' : 'Login' }}
      </button>
      <button
        type="button"
        @click="userStore.logout()"
        :disabled="!userStore.isLoggedIn"
      >
        Logout
      </button>
    </div>
  </div>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test HMR
  </p>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }

  .button-group {
    display: flex;
    gap: 8px;
    margin: 16px 0;
    flex-wrap: wrap;
  }

  .button-group button {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f0f0f0;
    cursor: pointer;
  }

  .button-group button:hover {
    background: #e0e0e0;
  }

  .button-group button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    background: #f9f9f9;
  }

  .card h2 {
    margin-top: 0;
    color: #333;
  }
</style>
