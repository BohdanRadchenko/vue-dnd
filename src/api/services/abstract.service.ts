import { AuthPath } from '@/api/paths/AuthPath'
import { BoardsPath } from '@/api/paths/BoardsPath'


export abstract class AbstractService {
  private readonly _auth: AuthPath = new AuthPath();
  private readonly _boards: BoardsPath = new BoardsPath();

  get boards(): BoardsPath {
    return this._boards
  }

  protected get auth(): AuthPath  {
    return this._auth;
  }
}
