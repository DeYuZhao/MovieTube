import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/login.vue'
import List from '../views/movie/movieList'
import movie from '../views/movie/movieDetail'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: {name: 'list'}
  },
   
  {
    path: '/MovieTube/list',
    name: 'list',
    component: List
  },
  {
    path: '/MovieTube/user/login',
    name: 'login',
    component: Login
  },
  {
    path: '/MovieTube/movie/:movieId',
    name: 'movie',
    component: movie
  }

]

const router = new VueRouter({
  routes
})

export default router
