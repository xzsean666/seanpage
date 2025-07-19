import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  const name = ref('Counter Store')

  // getters
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  return {
    // state
    count,
    name,
    // getters
    doubleCount,
    isEven,
  }
})
