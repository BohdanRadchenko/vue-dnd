import type { IBoard } from '@/interfaces'

export class BoardsPath {

  public get boards() {
    return 'boards'
  }

  public boardsById(boardId: IBoard['_id']) {
    return `boards/${boardId}`
  }
}
