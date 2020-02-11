import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/movie'
  },
  {
    path: '/movie',
    name: 'layout',
    redirect: '/movie/list',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/movie/list',
        name: 'list',
        component: ()=> import('@/views/movie/movieList')
      },
      {
        path: '/movie/movieDetail/:movieId',
        name: 'movieDetail',
        component: () => import('@/views/movie/movieDetail')
      },
      {
        path: '/movie/search',
        name: 'search',
        component: () => import('@/views/movie/searchMovie')
      },
      {
        path: '/user/info',
        component: () => import('@/views/user/info')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
