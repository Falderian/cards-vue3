import axios from 'axios'
import { constants, errorNotification, notification } from '../utils'
import type { IUser, ILoginUser } from '../types/types'

class UserApi {
  url: string
  constructor(url: string) {
    this.url = url
  }

  async signUp(user: IUser) {
    try {
      const newUser = await axios.post(this.url + 'user/signup', user)
      notification({ type: 'success', text: 'You have been signed up', title: 'Signup success' })
      return newUser
    } catch (error) {
      errorNotification(error as Error)
    }
  }

  async logIn(user: IUser) {
    const login = (await (await axios.post(this.url + 'user/signin', user)).data) as ILoginUser
    return login
  }
  async validateToken(payload: { token: string }) {
    const isValid = await axios.post(this.url + 'token', payload)
    return isValid
  }
}

export default new UserApi(constants.baseUrl)
