import type { IUser } from '@/interfaces/IUser'

export interface IAuthStore {
  isAuth: boolean,
  user: IUser | null;
  error: string | null;
}

export interface IAuthLoginProps {
  username: string;
  password: string;
}

export interface IAuthDataReturn {
  refreshToken: string;
  accessToken: string;
  user: IUser;
}
