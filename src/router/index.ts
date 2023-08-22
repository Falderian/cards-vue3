import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores/user'

import SignUp from '@/components/users/SignUp.vue'
import SignIn from '@/components/users/SignIn.vue'
import NotFound from '@/components/NotFound.vue'
import DashboardsView from '@/components/dashboards/DashboardsView.vue'
import DashboardScreen from '@/components/dashboards/DashboardScreen.vue'
import DashboardsScreen from '@/components/dashboards/DashboardsScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: DashboardsView,
      redirect: () => ({ name: 'list' }),
      beforeEnter: (to, from, next) => {
        const { isUserLogined } = userStore()
        if (isUserLogined) {
          return next()
        }
        next('/signin')
      },
      children: [
        {
          path: 'list',
          name: 'list',
          component: DashboardsScreen
        },
        {
          path: ':id',
          name: 'dashboard',
          component: DashboardScreen
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
