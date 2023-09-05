import type { ICard } from '@/interfaces/ICard'
import { IEntity } from '@/interfaces/IEntity'

export interface IList extends IEntity {
  title: string;
  pos: number;
  cards: ICard[];
}
