import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user', () => {
  // state
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const loading = ref(false)

  // getters
  const userName = computed(() => user.value?.name || 'Guest')
  const userEmail = computed(() => user.value?.email || '')
  const hasAvatar = computed(() => !!user.value?.avatar)

  // actions
  async function login(email: string, password: string) {
    loading.value = true
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 模拟登录成功
      user.value = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: 'https://via.placeholder.com/150',
      }
      isLoggedIn.value = true
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
  }

  function updateProfile(updates: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  return {
    // state
    user,
    isLoggedIn,
    loading,
    // getters
    userName,
    userEmail,
    hasAvatar,
    // actions
    login,
    logout,
    updateProfile,
  }
})
