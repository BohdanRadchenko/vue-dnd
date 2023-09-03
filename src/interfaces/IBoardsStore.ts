import type { IBoard } from '@/interfaces/IBoard'

export interface IBoardsState {
  boards: IBoard[];
  currentBoard: IBoard | null;
  isLoading: boolean;
}

export interface IBoardCreateProps {
  title: string;
}
