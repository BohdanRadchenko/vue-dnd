import type { IBoard } from '@/interfaces/IBoard'
import { IList } from '@/interfaces/IList'

export interface IBoardState {
  board: IBoard | null;
  isLoading: boolean;
}

export interface IBordListCreateProps extends Pick<IList, "title"> {}

export interface IBordListDeleteProps {
  listId: IList['_id'];
}
