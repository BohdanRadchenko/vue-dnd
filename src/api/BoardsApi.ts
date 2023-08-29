import type { IBoard, ICard, IList } from '@/interfaces'
import { LocalWorker } from '@/api/LocalWorker'

class LocalBoardWorker extends LocalWorker<number, IBoard> {
  constructor() {
    super("boards")
  }
}

export class BoardsApi {
  private readonly dao = new LocalBoardWorker()

  public save (board: IBoard) {
    this.dao.set({id: board.id, value: board})
  }

  public get load(): Map<number, IBoard> {
    return this.dao.get
  }

  public get get(): IBoard[] {
    return Array.from(this.load, ([_, board]) => board)
  }

  public getById(id: IBoard['id']):IBoard | null {
    return this.dao.getById(id);
  }

  public create(title: IBoard['title']): IBoard {
    const card: ICard = {
      id: Date.now(),
      description: "New card",
    }
    const items: IList[] = [{
      id: Date.now(),
      title: "List 1",
      items: [card],
      }]
    return this.dao.create({ items, title, } as IBoard);
  }

  public remove(boardId: IBoard['id']) {
    this.dao.remove(boardId);
  }
}
