import type { ICard } from '@/interfaces/ICard'

export interface IList {
  id: number;
  title: string;
  position: number;
  items: ICard[];
}
