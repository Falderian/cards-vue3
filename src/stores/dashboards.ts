import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IDashboard, createDashboardDro } from '@/types/types'
import dashboardsApi from '@/api/dashboardsApi'

export const dashboardsStore = defineStore('dashboardsStore', () => {
  const dashboards = ref<IDashboard[]>([])

  const getDashboards = async (userId: number) => {
    dashboards.value = await dashboardsApi.getUsersDashboards(userId)
  }

  const createDashboard = async (dashboard: createDashboardDro) => {
    const newDashboard = await dashboardsApi.createDashboard(dashboard)
    await getDashboards(dashboard.userId)
    return newDashboard
  }

  return { dashboards, getDashboards, createDashboard }
})
