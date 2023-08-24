import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { ILoginedUser } from '../types/types'

export const userStore = defineStore('user', () => {
  const user = reactive<ILoginedUser>({
    id: 0,
    username: '',
    isLogined: false
  })

  const setUser = (newUser: ILoginedUser) => {
    user.username = newUser.username
    user.id = newUser.id
    user.isLogined = true
  }

  const clearUser = () => {}

  return { user, setUser, clearUser }
})
