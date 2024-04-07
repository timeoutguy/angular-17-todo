export interface UserLoginRequestResponse {
  success: boolean
  data: Data
  message: string
}

export interface Data {
  user: User
  token: string
  token_type: string
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: any
  created_at?: string
  updated_at?: string
}
