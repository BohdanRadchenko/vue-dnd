import { BoardsService } from '@/api/services/boards.service'
import type { AxiosInstance } from 'axios'
import { AuthService } from '@/api/services/auth.service'
import restInstance from './restInstance';
import { SocketInstance } from '@/api/SocketInstance'
import { BoardService } from '@/api/services/board.service'

export class Api {
  private readonly _instance: AxiosInstance = restInstance;
  private readonly _socket: SocketInstance = new SocketInstance();
  private readonly _auth: AuthService = new AuthService(this._instance);
  private readonly _boards: BoardsService = new BoardsService(this._instance);
  private readonly _board: BoardService = new BoardService(this._socket);

  public get auth(): AuthService {
    return this._auth;
  }

  public get boards() {
    return this._boards;
  }

  public get board() {
    return this._board;
  }
}
