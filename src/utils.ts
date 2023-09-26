import { notify } from '@kyvg/vue3-notification'
import { AxiosError, isAxiosError } from 'axios'
import type { TNotification } from './types/types'
import { ref } from 'vue'

const constants = {
  baseUrl: 'http://localhost:5000/api/'
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

const useSelectPriority = (priority: string = 'low') => {
  const options = ['low', 'medium', 'high']
  const selectedOption = ref(priority)
  const selectName = 'Select a priority '

  const selectItem = (item: string) => {
    selectedOption.value = item
  }

  return { selectItem, options, selectName, selectedOption }
}

const useSelectStatus = (status: string) => {
  const options = ['toDo', 'inProgress', 'review', 'completed']
  const selectedOption = ref('')
  const selectName = 'Select a status for the card'

  const selectItem = (item: string) => {
    selectedOption.value = item
  }
  selectItem(status)

  return { selectItem, options, selectName, selectedOption }
}

export {
  formatDate,
  taskStatuses,
  constants,
  errorNotification,
  notification,
  useSelectPriority,
  useSelectStatus
}
