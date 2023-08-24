import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '../components/users/SignUp.vue'
import SignIn from '../components/users/SignIn.vue'
import DashboardsView from '../components/dashboards/DashboardsView.vue'
import DashboardsScreen from '../components/dashboards/DashboardsScreen.vue'
import DashboardScreen from '../components/dashboards/DashboardScreen.vue'
import NotFound from '../components/NotFound.vue'
import { isUserLogined } from '../helpers/userHelpers'

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

router.beforeEach(async (to, from, next) => {
  const { name } = to
  const isLogined = await isUserLogined()
  if (name !== 'SignIn' && !isLogined) next({ name: 'SignIn' })
  else next()
})

export default router
