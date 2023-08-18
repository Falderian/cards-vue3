import type { ILoginUser, IUser } from '@/types/types'
import axios from 'axios'

class Api {
  url = 'https://cards-nestjs.cyclic.cloud/api/'

  async signUp(user: IUser) {
    const newUser = await axios.post(this.url + 'user/signup', user)
    return newUser
  }
  async logIn(user: IUser) {
    const login = (await (await axios.post(this.url + 'user/signin', user)).data) as ILoginUser
    return login
  }
}

export default new Api()
