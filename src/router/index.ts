import { createRouter, createWebHistory } from 'vue-router'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, routes } from './routes'
import { store } from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach( (to, from, next) => {
  const requiresAuth = (to.meta as Record<string, unknown>).requireAuth;
  const closeableWithAuth = [LOGIN_ROUTE, REGISTER_ROUTE]

  if(store.state.auth.isAuth && closeableWithAuth.includes(to.path)) return next(HOME_ROUTE)

  if(!!requiresAuth && !store.state.auth.isAuth) return next(LOGIN_ROUTE)

  next();
});


export default router
