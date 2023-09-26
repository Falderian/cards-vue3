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
    toDo: ICard[]
    inProgress: ICard[]
    review: ICard[]
    completed: ICard[]
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
  userId?: number
  description?: string
  id?: number
}

type createCardDto = {
  title: string
  content: string
  status: string
  userId: number
  dashboardId: number
}

type updateCardDto = {
  id: number
  title: string
  content: string
  status: string
}

type ILoginedUser = {
  username: string
  id: number
  isLogined: boolean
}

interface ITaskStatuses {
  [key: string]: string | undefined
}

type TNotification = {
  type: string
  text: string
  title: string
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
  ITaskStatuses,
  TNotification
}
