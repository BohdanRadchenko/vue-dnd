import type { IBoard} from '@/interfaces'
import type { AxiosInstance } from 'axios'
import { AbstractService } from '@/api/services/abstract.service'
import type { IBoardCreateProps } from '@/interfaces'

export class BoardsService extends AbstractService{
  constructor(private readonly instance: AxiosInstance) {
    super()
  }

  public get get(){
    return this.instance
      .get<IBoard[]>(this.boards.boards)
      .then(({data}) => data);
  }

  public create(data: IBoardCreateProps) {
    return this.instance
      .post<IBoard>(this.boards.boards, {...data})
      .then(({data}) => data);
  }

  public deleteById(boardId: IBoard['_id']) {
    return this.instance.delete(this.boards.boardsById(boardId))
  }

  public getById(boardId: IBoard['_id']) {
    return this.instance
      .get<IBoard>(this.boards.boardsById(boardId))
      .then(({data}) => data);
  }

  public updateById(boardId: IBoard['_id'], data: Omit<IBoard, '_id'>) {
    return this.instance
      .patch<IBoard>(this.boards.boardsById(boardId), {...data})
      .then(({data}) => data);
  }

  // public save (board: IBoard) {
  //   this.dao.set({id: board.id, value: board})
  // }
  //
  // public get load(): Map<number, IBoard> {
  //   return this.dao.get
  // }
  //
  // public get get(): IBoard[] {
  //   return Array.from(this.load, ([_, board]) => board)
  // }
  //
  // public getById(id: IBoard['id']):IBoard | null {
  //   return this.dao.getById(id);
  // }
  //
  // public create(title: IBoard['title']): IBoard {
  //   const card: ICard = {
  //     id: Date.now(),
  //     description: "New card",
  //   }
  //   const items: IList[] = [{
  //     id: Date.now(),
  //     title: "List 1",
  //     items: [card],
  //     }]
  //   return this.dao.create({ items, title, } as IBoard);
  // }
  //
  // public remove(boardId: IBoard['id']) {
  //   this.dao.remove(boardId);
  // }
}
