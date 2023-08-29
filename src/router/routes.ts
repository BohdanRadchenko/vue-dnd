export const BOARDS_ROUTE: string = '/boards';
export const BOARDS_ROUTE_NAME: string = 'boards';
export const BOARDS_PAGE_ROUTE: string = '/boards/:boardId';
export const BOARDS_PAGE_ROUTE_NAME: string = 'board';

const BoardsView = () => import("../views/BoardsView.vue")
const BoardView = () => import("../views/BoardView.vue")

export const routes = [
  {
    path: BOARDS_ROUTE,
    name: BOARDS_ROUTE_NAME,
    component: BoardsView
  },
  {
    path: BOARDS_PAGE_ROUTE,
    name: BOARDS_PAGE_ROUTE_NAME,
    component: BoardView
  },
  {
    path: "/:catchAll(.*)",
    redirect: {name: BOARDS_ROUTE_NAME}
  }
]
