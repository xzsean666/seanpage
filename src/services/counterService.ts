import { useCounterStore } from '@/stores/counter'

export function incrementCounter() {
  const counterStore = useCounterStore()
  counterStore.count++
}

export function decrementCounter() {
  const counterStore = useCounterStore()
  counterStore.count--
}

export function resetCounter() {
  const counterStore = useCounterStore()
  counterStore.count = 0
}

export function incrementCounterBy(amount: number) {
  const counterStore = useCounterStore()
  counterStore.count += amount
}

// 之前在 store 中的模拟 SDK 逻辑现在可以放在这里
export function performSdkOperation(type: 'increment' | 'decrement') {
  console.log(`模拟 SDK 操作：执行 ${type} ...`)
  const counterStore = useCounterStore()
  if (type === 'increment') {
    incrementCounter()
  } else if (type === 'decrement') {
    decrementCounter()
  }
  console.log('SDK 操作完成，Store 状态已更新。')
} 