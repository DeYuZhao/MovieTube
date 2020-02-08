import Vue from 'vue'
import router from '@/router'
import {
    loginAPI,
    registerAPI,
    getUserInfoAPI
} from '@/api/user'


const user = {
    state: {
        token:'',
        name:'',
        welcome:'',
        info: {}
    },

    mutations: {
        set_token: function(state, token){
            state.token = token
        }
    },

    actions: {
        login: async ({ commit }, userData) => {
            const res = await loginAPI(userData)
            if(res){
                Vue.ls.set('ACCESS_TOKEN', res, 7 * 24 * 60 * 60 * 1000)
                commit('set_token', res)

                router.push('/MovieTube/list')
            }
        }
    }
}

export default user