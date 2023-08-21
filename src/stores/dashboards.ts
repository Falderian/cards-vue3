import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IDashboard } from '@/types/types'
import dashboardsApi from '@/api/dashboardsApi'

type createDashboardDro = {
  title: string
  userId: number
}

export const dashboardsStore = defineStore('dashboardsStore', () => {
  const dashboards = ref<IDashboard[]>([])

  const getDashboards = async (userId: number) => {
    dashboards.value = await dashboardsApi.getUsersDashboards(userId)
  }

  const createDashboard = async (payload: createDashboardDro) => {
    const newDashboard = await dashboardsApi.createDashboard(payload)
    getDashboards(payload.userId)
    return newDashboard
  }

  return { dashboards, getDashboards, createDashboard }
})
