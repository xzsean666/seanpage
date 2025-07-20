<script setup lang="ts">
  import { useCounterStore } from '../stores/counter'
  import { useUserStore } from '../stores/user'
  import Button from 'primevue/button'
  import InputText from 'primevue/inputtext'
  import Card from 'primevue/card'
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
  <div class="container mx-auto px-4 py-8 max-w-screen-xl">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">
      {{ msg }}
    </h1>

    <Card class="mb-6 shadow-lg rounded-xl p-6 max-w-600px mx-auto">
      <template #title>
        <h2 class="text-3xl font-bold text-blue-700 mb-4 text-center">
          Counter Store Demo
        </h2>
      </template>
      <template #content>
        <p class="text-lg text-gray-700 mb-2 text-center">
          Count: <span class="font-semibold">{{ counterStore.count }}</span>
        </p>
        <p class="text-lg text-gray-700 mb-2 text-center">
          Double Count:
          <span class="font-semibold">{{ counterStore.doubleCount }}</span>
        </p>
        <p class="text-lg text-gray-700 mb-6 text-center">
          Is Even:
          <span class="font-semibold">{{
            counterStore.isEven ? 'Yes' : 'No'
          }}</span>
        </p>

        <div class="flex gap-4 flex-wrap justify-center">
          <Button
            label="Increment"
            @click="incrementCounter()"
            class="p-button-sm p-button-success"
          />
          <Button
            label="Decrement"
            @click="decrementCounter()"
            class="p-button-sm p-button-danger"
          />
          <Button
            label="Reset"
            @click="resetCounter()"
            class="p-button-sm p-button-warning"
          />
          <Button
            label="+5"
            @click="incrementCounterBy(5)"
            class="p-button-sm p-button-info"
          />
        </div>
      </template>
    </Card>

    <Card class="mb-6 shadow-lg rounded-xl p-6 max-w-600px mx-auto">
      <template #title>
        <h2 class="text-3xl font-bold text-blue-700 mb-4 text-center">
          User Store Demo
        </h2>
      </template>
      <template #content>
        <p class="text-lg text-gray-700 mb-2 text-center">
          User: <span class="font-semibold">{{ userStore.userName }}</span>
        </p>
        <p class="text-lg text-gray-700 mb-2 text-center">
          Email: <span class="font-semibold">{{ userStore.userEmail }}</span>
        </p>
        <p class="text-lg text-gray-700 mb-2 text-center">
          Logged In:
          <span class="font-semibold">{{
            userStore.isLoggedIn ? 'Yes' : 'No'
          }}</span>
        </p>
        <p class="text-lg text-gray-700 mb-6 text-center">
          Loading:
          <span class="font-semibold">{{
            userStore.loading ? 'Yes' : 'No'
          }}</span>
        </p>

        <div class="flex gap-4 flex-wrap justify-center">
          <Button
            :label="userStore.loading ? 'Logging in...' : 'Login'"
            @click="handleLogin"
            :disabled="userStore.loading"
            class="p-button-primary"
          />
          <Button
            label="Logout"
            @click="userStore.logout()"
            :disabled="!userStore.isLoggedIn"
            class="p-button-secondary"
          />
        </div>
      </template>
    </Card>

    <Card class="shadow-lg rounded-xl p-6 max-w-600px mx-auto">
      <template #title>
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
          PrimeVue & Tailwind CSS Samples
        </h2>
      </template>
      <template #content>
        <div class="flex flex-col items-center">
          <div class="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-gray-700 mb-4 text-center">
              Button
            </h3>
            <div class="flex justify-center gap-4">
              <Button
                label="Submit"
                class="p-button-primary p-button-lg shadow-md hover:shadow-lg transition duration-300"
              />
              <Button
                label="Secondary"
                class="p-button-secondary p-button-lg shadow-md hover:shadow-lg transition duration-300"
              />
            </div>
          </div>

          <div class="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-gray-700 mb-4 text-center">
              Input Text
            </h3>
            <InputText
              type="text"
              placeholder="Enter your name"
              class="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-gray-700 mb-4 text-center">
              Card
            </h3>
          </div>
        </div>
      </template>
    </Card>

    <p class="text-gray-600 mt-8 text-sm text-center">
      Edit
      <code class="font-mono bg-gray-200 text-gray-800 px-1 py-0.5 rounded"
        >components/HelloWorld.vue</code
      >
      to test HMR
    </p>
  </div>
</template>
