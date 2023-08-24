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

export { formatDate, taskStatuses, constants }
