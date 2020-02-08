import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import movie from '@/store/modules/movie'
import getters from '@/store/getters'
import comment from '@/store/modules/comment'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    movie,
    comment
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})
