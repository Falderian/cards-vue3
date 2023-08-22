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

interface IDashboard {
  id: number
  title: string
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

export type { IError, IUser, ILoginUser, IDashboard, ICard }
