import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const id = ref(0)
  const isUserLogined = ref(false)

  const setUserId = (userId: number) => {
    id.value = userId
  }

  const setUserLogin = (cond: boolean) => {
    isUserLogined.value = cond
  }

  return { id, setUserId, isUserLogined, setUserLogin }
})
