import { notify } from '@kyvg/vue3-notification'
import { isAxiosError } from 'axios'
import type { TNotification } from './types/types'

const constants = {
  baseUrl: 'http://localhost:2000/api/'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const taskStatuses = {
  toDo: 'To do',
  inProgress: 'In progress',
  review: 'Review',
  completed: 'Completed'
}

const errorNotification = (error: Error) => {
  isAxiosError(error) &&
    notify({
      title: error.response?.statusText,
      text: error.response!.data.message.join(', '),
      type: 'error'
    })
}

const notification = (notification: TNotification) => {
  notify({ ...notification })
}

export { formatDate, taskStatuses, constants, errorNotification, notification }
