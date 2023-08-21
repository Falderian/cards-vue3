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
  cards: []
}

export type { IError, IUser, ILoginUser, IDashboard }
