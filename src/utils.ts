import { useCookies } from 'vue3-cookies'
import userApi from './api/userApi'

const constants = {
  baseUrl: 'http://localhost:5000/api/'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const isTokenValid = async () => {
  const { cookies } = useCookies()
  const token = cookies.get('token')
  const isValid = await userApi.validateToken({ token })
}

const taskStatuses = {
  toDo: 'To do',
  inProgress: 'In progress',
  review: 'Review',
  completed: 'Completed'
}

export { formatDate, isTokenValid, taskStatuses, constants }
