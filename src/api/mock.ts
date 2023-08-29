import type { IBoard, IList } from '@/interfaces'

export const list1: IList = {
  id: 10010101,
  title: "List 1 title",
  items: [
    {id: 10, description: "description 10"},
    {id: 11, description: "description 11"},
    {id: 12, description: "description 12"},
    {id: 13, description: "description 13"},
    {id: 14, description: "description 14"},
    {id: 15, description: "description 15"},
  ]
}
export const list2: IList = {
  id: 20020202,
  title: "List 2 title",
  items: [
    {id: 20, description: "description 20"},
    {id: 21, description: "description 21"},
    {id: 22, description: "description 22"},
    {id: 23, description: "description 23"},
    {id: 24, description: "description 24"},
    {id: 25, description: "description 25"},
  ]
}

export const board: IBoard = {
  id: Date.now() + 10,
  title: "Test Board title",
  items: [
    list1,
    list2
  ],
}
export const board1: IBoard = {
  id: Date.now() + 20,
  title: "Test Board title",
  items: [
    list1,
    list2
  ],
}
