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
      redirect: () => ({ name: 'DashboardsList' }),
      children: [
        {
          path: 'list',
          name: 'DashboardsList',
          component: DashboardsScreen
        },
        {
          path: ':id',
          name: 'Dashboard',
          component: DashboardScreen
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, _, next) => {
  const { name } = to
  const isLogined = await isUserLogined()
  const userInfo = name !== 'SignIn' && name !== 'SignUp'
  if (userInfo && !isLogined) next({ name: 'SignIn' })
  else next()
})

export default router
