import type { IList } from '@/interfaces/IList'
import type { IEntity } from '@/interfaces/IEntity'
import type { IUser } from '@/interfaces/IUser'

export interface IBoard extends IEntity {
  title: string;
  isOwner: boolean;
  owner: IUser['_id'];
  items: IList[];
}
