import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/users/SignUp.vue'
import LogIn from '../components/users/LogIn.vue'
import DashboardsView from '@/components/dasboards/DashboardsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: DashboardsView
    }
  ]
})

export default router
