import { BoardsApi } from '@/api/BoardsApi'

export class Api {
  private boards: BoardsApi = new BoardsApi();

  public get boards() {
    return this.boards;
  }

}
