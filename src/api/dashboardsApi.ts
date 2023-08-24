import axios from 'axios'
import { constants } from '../utils'
import { useCookies } from 'vue3-cookies'
import { createDashboardDro, IDashboard } from '../types/types'

const { cookies } = useCookies()

class DashboardsApi {
  url: string
  config: {}

  constructor(url: string) {
    this.url = url + 'dashboards/'
    const token = cookies.get('token')

    this.config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }

  async getUsersDashboards(userId: number) {
    const dashboards = (await axios.get(this.url + userId, this.config)).data
    return dashboards
  }

  async createDashboard(payload: createDashboardDro) {
    const newDashboard = await axios.post(this.url, payload, this.config)
    return newDashboard
  }

  async getDashboard(dashboardId: number): Promise<IDashboard> {
    const cards = (await axios.get(this.url + dashboardId + '/cards', this.config)).data
    return cards
  }

  async updateDashboard(dashboard: createDashboardDro) {
    const updatedDashboard = await axios.put(this.url, dashboard, this.config)
    return updatedDashboard
  }
}

export default new DashboardsApi(constants.baseUrl)
