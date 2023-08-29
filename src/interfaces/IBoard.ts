import type { IList } from '@/interfaces/IList'
import type { IEntity } from '@/interfaces/IEntity'

export interface IBoard extends IEntity {
  title: string;
  items: IList[];
}
