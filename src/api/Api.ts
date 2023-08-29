import { BoardsApi } from '@/api/BoardsApi'

export class Api {
  private _boards: BoardsApi = new BoardsApi();

  public get boards() {
    return this._boards;
  }

}
