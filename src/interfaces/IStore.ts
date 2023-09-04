import { IBoardsState } from '@/interfaces/IBoardsStore'
import { IBoardState } from '@/interfaces/IBoardStore'
import { IAuthState } from '@/interfaces/IAuthState'

export interface IStoreState {
  boards: IBoardsState;
  board: IBoardState;
  auth: IAuthState;
}
