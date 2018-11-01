import Vue from 'vue'
import Router, { Route } from 'vue-router'
import NotFound from '../NotFound/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "R0" */'../Home/Home.vue')
    },
    {
      path: '/my-pins',
      component: () => import(/* webpackChunkName: "R1" */'../MyPins/MyPins.vue')
    },
    {
      path: '/add-pin',
      component: () => import(/* webpackChunkName: "R2" */'../AddPin/AddPin.vue')
    },
    {
      path: '*',
      component: NotFound
    },
  ]
})

router.beforeEach((to: Route, from: Route, next: any) => {
  if (to.matched[0] && to.matched[0].path === '*') {
    return next({ redirect: '/' })
  }
  next()
})

export default router
