import type { IBoard } from '@/interfaces/IBoard'

export interface IBoardState {
  board: IBoard | null;
  isLoading: boolean;
}
