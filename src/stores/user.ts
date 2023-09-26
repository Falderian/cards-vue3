import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ILoginedUser } from '../types/types'

const emtpyUser = <ILoginedUser>{
  id: 0,
  username: '',
  isLogined: false
}

export const userStore = defineStore('userStore', () => {
  const user = reactive({ ...emtpyUser })

  const setUser = (newUser: ILoginedUser) => {
    user.username = newUser.username
    user.id = newUser.id
    user.isLogined = newUser.isLogined
  }

  const $reset = () => {
    setUser({ ...emtpyUser })
  }

  return { user, setUser, $reset }
})
