import { useCookies } from 'vue3-cookies'
import userApi from './api/userApi'
export const constants = {
  baseUrl: 'http://localhost:5000/api/'
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

export const isTokenValid = async () => {
  const { cookies } = useCookies()
  const token = cookies.get('token')
  const isValid = await userApi.validateToken({ token })
  console.log(isValid)
}
