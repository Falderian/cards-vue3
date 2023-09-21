import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ILoginedUser } from '../types/types'

const emtpyUser = reactive<ILoginedUser>({
  id: 0,
  username: '',
  isLogined: false
})

export const userStore = defineStore('user', () => {
  const user = emtpyUser

  const setUser = (newUser: ILoginedUser) => {
    emtpyUser.username = newUser.username
    emtpyUser.id = newUser.id
    emtpyUser.isLogined = true
  }

  const clearUser = () => {
    setUser(emtpyUser)
  }

  return { user, setUser, clearUser }
})
