import type { IBoard } from '@/interfaces/IBoard'
import type { IList } from '@/interfaces/IList'

export interface IBoardState {
  board: IBoard | null;
  isLoading: boolean;
}

export interface IBordListCreateProps {
  title: string;
  position: IList['position']
}
