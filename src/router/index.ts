import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach( (to, from, next) => {
  // if(to.matched.some(record => !!record.meta.isAuth)){
  //   let user = JSON.parse(localStorage.getItem('user'))
  //   if(!user){
  //     next(LOGIN_ROUTE)
  //   }
  // }
  next();
})


export default router
