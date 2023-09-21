interface IError {
  error: string
  message: string[] | string
  statusCode: number
}

interface IUser {
  username: string
  password: string
}

interface ILoginUser {
  userId: number
  access_token: string
}

type IDashboard = {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
  tasksCount: number
  cards: {
    toDo: string
    inProgress: string
    review: string
    completed: string
  }
}

interface ICard {
  id: number
  content: string
  priority: string
  status: string
  title: string
  created_at: string
  updated_at: string
}

type createDashboardDro = {
  title: string
  userId: number
  description?: string
}

type createCardDto = {
  title: string
  content: string
  status: string
  userId: number
  dashboardId: number
}

type updateCardDto = {
  title: string
  content: string
  id: number
}

type ILoginedUser = {
  username: string
  id: number
  isLogined: boolean
}

interface ITaskStatuses {
  [key: string]: string | undefined
}

export type {
  IError,
  IUser,
  ILoginUser,
  ILoginedUser,
  IDashboard,
  ICard,
  createDashboardDro,
  createCardDto,
  updateCardDto,
  ITaskStatuses
}
