import { type ILoginUser } from '@/types/types'
import axios from 'axios'
import IUser from '@/types/types'
import { constants } from '../utils'

class UserApi {
  url: string

  constructor(url: string) {
    this.url = url
  }

  async signUp(user: IUser) {
    const newUser = await axios.post(this.url + 'user/signup', user)
    return newUser
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
