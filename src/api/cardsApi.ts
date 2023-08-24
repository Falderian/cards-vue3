import axios from 'axios'
import { constants } from '../utils'
import { useCookies } from 'vue3-cookies'
import { createCardDto } from '../types/types'

const { cookies } = useCookies()

class CardsApi {
  url: string
  config: {}

  constructor(url: string) {
    this.url = url + 'cards/'
    const token = cookies.get('token')

    this.config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }

  async createCard(payload: createCardDto) {
    const newCard = await axios.post(this.url, payload, this.config)
    return newCard
  }

  async deleteCard(id: number) {
    const req = await axios.delete(this.url + 'id', this.config)
    return req
  }
}

export default new CardsApi(constants.baseUrl)
