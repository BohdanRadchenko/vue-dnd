import { IList } from '@/interfaces/IList'

export interface IBoard {
  id: number;
  title: string;
  items: IList[];
}
