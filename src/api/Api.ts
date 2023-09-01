import { BoardsApi } from '@/api/BoardsApi'
import type { AxiosInstance } from 'axios'
import { AuthService } from '@/api/services/auth.service'
import restInstance from './restInstance';

export class Api {
  private readonly _instance: AxiosInstance = restInstance;
  private readonly _boards: BoardsApi = new BoardsApi();
  private readonly _auth: AuthService = new AuthService(this._instance);

  public get boards() {
    return this._boards;
  }

  public get auth(): AuthService {
    return this._auth;
  }
}
