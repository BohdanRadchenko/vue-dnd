import { AuthPath } from '@/api/paths/AuthPath'
import { BoardsPath } from '@/api/paths/BoardsPath'
import { BoardsEvent } from '@/api/paths/BoardEvents'


export abstract class AbstractService {
  private readonly _auth: AuthPath = new AuthPath();
  private readonly _boards: BoardsPath = new BoardsPath();
  private readonly _board: BoardsEvent = new BoardsEvent();

  protected get auth(): AuthPath  {
    return this._auth;
  }

  protected get boards(): BoardsPath {
    return this._boards
  }

  protected get board(): BoardsEvent {
    return this._board
  }

}
