export const LOGIN_ROUTE: string = '/login';
export const LOGIN_ROUTE_NAME: string = 'login';

export const BOARDS_ROUTE: string = '/boards';
export const BOARDS_ROUTE_NAME: string = 'boards';
export const BOARDS_PAGE_ROUTE: string = '/boards/:boardId';
export const BOARDS_PAGE_ID_ROUTE: string = ':boardId';
export const BOARDS_PAGE_ROUTE_NAME: string = 'board';

const LoginView = () => import("../views/LoginView.vue")

const Layout = () => import("../components/LayoutRouterView.vue")
const BoardsView = () => import("../views/BoardsView.vue")
const BoardView = () => import("../views/BoardView.vue")

export const routes = [
  {
    path: LOGIN_ROUTE,
    name: LOGIN_ROUTE_NAME,
    component: LoginView,
  },
  {
    path: BOARDS_ROUTE,
    name: BOARDS_ROUTE_NAME,
    component: Layout,
    children: [
      {
        path: "",
        component: BoardsView,
      }, {
        path: BOARDS_PAGE_ID_ROUTE,
        name: BOARDS_PAGE_ROUTE_NAME,
        component: BoardView,
      },
      {
        path: "/:catchAll(.*)",
        redirect: {name: ""},
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: {name: LOGIN_ROUTE_NAME},
  }
]
