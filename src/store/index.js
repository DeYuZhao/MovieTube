import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import movie from '@/store/modules/movie'
import getters from '@/store/getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    movie
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})
