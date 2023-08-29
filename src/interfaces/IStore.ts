import { IBoard } from '@/interfaces/IBoard'
import { IList } from '@/interfaces/IList'
import { ICard } from '@/interfaces/ICard'

export interface IStoreState {
  boardsMap: Map<number, IBoard>;
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
