import type { IBoard } from '@/interfaces/IBoard'
import type { IList } from '@/interfaces/IList'
import type { ICard } from '@/interfaces/ICard'
import { IBoardsState } from '@/interfaces/IBoardsStore'
import { IAuthState } from '@/interfaces/IAuthState'

export interface IStoreState {
  boards: IBoardsState;
  auth: IAuthState;
}

export interface ICardAddProps {
  boardId: IBoard['id'];
  listId: IList['id'];
  card: Partial<ICard>;
  index: number;
}

export interface ICardRemoveProps {
  boardId: IBoard['id'];
  listId: IList['id'];
  cardId: ICard['id'];
}


export interface IListRenameProps {
  boardId: IBoard['id'];
  listId: IList['id'];
  title: IList['title'];
}

export interface IListRemoveProps {
  boardId: IBoard['id'];
  listId: IList['id'];
}
