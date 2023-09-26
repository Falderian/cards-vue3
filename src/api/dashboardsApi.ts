import axios, { AxiosError, isAxiosError } from 'axios'
import { constants, errorNotification, notification } from '../utils'
import { useCookies } from 'vue3-cookies'
import type { createDashboardDro, IDashboard, IError } from '../types/types'

const { cookies } = useCookies()

class DashboardsApi {
  url: string
  config: {} | undefined
  token: string | undefined

  constructor(url: string) {
    this.url = url + 'dashboards/'
    this.updateConfig()
  }

  async getUsersDashboards(userId: number) {
    try {
      this.updateConfig()
      const dashboards = (await axios.get(this.url + userId, this.config)).data
      return dashboards
    } catch (error) {
      errorNotification(error as Error)
    }
  }

  async createDashboard(payload: createDashboardDro) {
    try {
      const newDashboard = await axios.post(this.url, payload, this.config)
      notification({ type: 'success', title: 'Success', text: 'New dashboard have been created' })
      return newDashboard
    } catch (error) {
      const err = (error as AxiosError).response!

      const { message } = err.data as IError
      
      notification({
        title: err.statusText,
        text: message.toString(),
        type: 'error'
      })
    }
  }

  async getDashboard(dashboardId: number): Promise<IDashboard | undefined> {
    try {
      const cards = (await axios.get(this.url + dashboardId + '/cards', this.config)).data
      return cards
    } catch (error) {
      errorNotification(error as Error)
    }
  }

  async updateDashboard(dashboard: createDashboardDro) {
    try {
      const updatedDashboard = await axios.put(this.url, dashboard, this.config)
      return updatedDashboard
    } catch (error) {
      errorNotification(error as Error)
    }
  }

  private updateConfig() {
    if (!this.token) this.token = cookies.get('token')
    this.config = {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }
  }
}

export default new DashboardsApi(constants.baseUrl)
