import axios from 'axios'
import { constants } from '../utils'
import { useCookies } from 'vue3-cookies'
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

  async createDashboard(payload: { title: string; userId: number }) {
    const newDashboard = await axios.post(this.url, payload, this.config)
    return newDashboard
  }
}

export default new DashboardsApi(constants.baseUrl)
