import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/login.vue'
import List from '../views/movie/movieList'
Vue.use(VueRouter)

const routes = [
   
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
  // {
  //   path: '/MovieTube/movie',
  //   name:''
  // }

]

const router = new VueRouter({
  routes
})

export default router
