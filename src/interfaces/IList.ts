import { ICard } from '@/interfaces/ICard'

export interface IList {
  id: number;
  title: string;
  items: ICard[];
}
