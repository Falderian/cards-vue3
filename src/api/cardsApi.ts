import axios from 'axios'
import { constants, errorNotification, notification } from '../utils'
import { useCookies } from 'vue3-cookies'
import type { createCardDto, updateCardDto } from '../types/types'

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
    try {
      const newCard = await axios.post(this.url, payload, this.config)
      notification({ type: 'success', title: 'Success', text: 'New card have been created' })
      return newCard
    } catch (error) {
      errorNotification(error as Error)
    }
  }

  async updateCard(payload: updateCardDto) {
    try {
      const req = await axios.patch(this.url, payload, this.config)
      notification({ type: 'success', title: 'Success', text: 'Card have been updated' })
      return req
    } catch (error) {
      errorNotification(error as Error)
    }
  }

  async deleteCard(id: number) {
    try {
      const req = await axios.delete(this.url + id, this.config)
      notification({ type: 'success', title: 'Success', text: 'Card have been deleted' })
      return req
    } catch (error) {
      errorNotification(error as Error)
    }
  }
}

export default new CardsApi(constants.baseUrl)
