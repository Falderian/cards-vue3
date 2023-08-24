import { useCookies } from 'vue3-cookies'
import UserApi from '../api/userApi'
import { userStore } from '../stores/user'

const isUserLogined = async (): Promise<boolean> => {
  const { user, setUser } = userStore()
  if (user.isLogined) return true

  const { cookies } = useCookies()
  const token = cookies.get('token')

  if (!token) return false

  const findUser = (await UserApi.validateToken({ token })).data
  setUser(findUser)

  return true
}

export { isUserLogined }
