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

export type { IError, IUser, ILoginUser }
