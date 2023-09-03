export const LOGIN_ROUTE: string = '/login';
export const LOGIN_ROUTE_NAME: string = 'login';

export const REGISTER_ROUTE: string = '/register';
export const REGISTER_ROUTE_NAME: string = 'register';

export const BOARDS_ROUTE: string = '/boards';
export const BOARDS_ROUTE_NAME_INDEX: string = 'boards.index';
export const BOARDS_ROUTE_NAME: string = 'boards';

export const BOARDS_PAGE_ROUTE: string = '/boards/:boardId';
export const BOARDS_PAGE_ID_ROUTE: string = ':boardId';
export const BOARDS_PAGE_ROUTE_NAME: string = 'board';

export const HOME_ROUTE = BOARDS_ROUTE;

const LoginView = () => import("../views/LoginView.vue")
const RegisterView = () => import("../views/RegisterView.vue")

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
    path: REGISTER_ROUTE,
    name: REGISTER_ROUTE_NAME,
    component: RegisterView,
  },
  {
    path: BOARDS_ROUTE,
    name: BOARDS_ROUTE_NAME_INDEX,
    component: Layout,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: BOARDS_PAGE_ID_ROUTE,
        name: BOARDS_PAGE_ROUTE_NAME,
        component: BoardView,
      },
      {
        path: "",
        name: BOARDS_ROUTE_NAME,
        component: BoardsView,
      },
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: {path: HOME_ROUTE},
  }
]
