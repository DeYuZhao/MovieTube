import Vue from 'vue'
import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    loginAPI,
    registerAPI,
    getUserInfoAPI,
    updateUserInfoByIdAPI,
} from '@/api/user'

import {
    listUserPostCommentsAPI,
    listUserReceiveCommentsAPI,
} from '@/api/comment'

import {
    getCommentCountBarChartAPI
} from '@/api/chart'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        userId: '',
        userInfo: {

        },
        postCommentsList: {

        },
        receiveCommentsList: {

        },
        postCommentsParams: {
            userId: '',
            pageNo: 0,
            pageSize: 10
        },
        recieveCommentsParams: {
            userId: '',
            pageNo: 0,
            pageSize: 10
        },
        postLoading: true,
        receiveLoading: true,
        commentChartData: {

        },
        commentChartLoading: true
    }
}

const user = {
    state : getDefaultState(),

    mutations: {
        reset_state: function(state) {
            state.token = '',
            state.userId = '',
            state.userInfo = {
                
            }
        },
        set_token: function(state, token){
            state.token = token
        },
        set_userId: (state, data) => {
            state.userId = data
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data
            }
        },
        set_postCommentsList: (state, data) => {
            state.postCommentsList = {
                ...state.postCommentsList,
                ...data
            }
        },
        set_receiveCommentsList: (state, data) => {
            state.receiveCommentsList = {
                ...state.receiveCommentsList,
                ...data
            }
        },
        set_postCommentsParams: (state, data) => {
            state.postCommentsParams = {
                ...state.postCommentsParams,
                ...data
            }
        },
        set_recieveCommentsParams: (state, data) => {
            state.recieveCommentsParams = {
                ...state.recieveCommentsParams,
                ...data
            }
        },
        set_postLoading: (state, data) => {
            state.postLoading = data
        },
        set_receiveLoading: (state, data) => {
            state.receiveLoading = data
        },
        set_commentChartData: (state, data) => {
            state.commentChartData = {
                ...state.commentChartData,
                ...data
            }
        },
        set_commentChartLoading: (state, data) => {
            state.commentChartLoading = data
        }
    },

    actions: {
        login: async ({ commit }, userData) => {
            const res = await loginAPI(userData)
            if(res){
                setToken(res)
                // Vue.ls.set('ACCESS_TOKEN', res, 7 * 24 * 60 * 60 * 1000)
                commit('set_token', res)
            }
        },
        register: async({ commit }, data) => {
            const res = await registerAPI(data)
            if(res){
                message.success('注册成功')
            }
        },
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
              getUserInfoAPI().then(response => {
                const data = response
                if (!data) {
                  reject('登录已过期，请重新登录')
                }
                commit('set_userInfo', data)
                commit('set_userId', data.userId)
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
        },
        updateUserInfoById: async({ state, dispatch }, data) => {
            data.userId = state.userId
            const res = await updateUserInfoByIdAPI(data)
            if(res){
                dispatch('getUserInfo')
                message.success('修改成功')
            }else{
                message.error('修改失败')
            }
        },
        getUserPostComments: async({ state, commit }) => {
            commit('set_postCommentsParams', {
                userId: state.userId
            })
            const res = await listUserPostCommentsAPI(state.postCommentsParams)
            if(res){
                commit('set_postCommentsList', res)
                commit('set_postLoading', false)
            }
        },
        getUserReceiveComments: async({ state, commit }) => {
            commit('set_recieveCommentsParams', {
                userId: state.userId
            })
            const res = await listUserReceiveCommentsAPI(state.recieveCommentsParams)
            if(res){
                commit('set_receiveCommentsList', res)
                commit('set_receiveLoading', false)
            }
        },
        getCommentCountBarChart: async({ state, commit }) => {
            const params = {
                userId: state.userId
            }
            const res = await getCommentCountBarChartAPI(params)
            if(res){
                commit('set_commentChartData', res)
                commit('set_commentChartLoading', false)
            }
        },
        logout: async({ commit }) => {
            removeToken()
            resetRouter()
            commit('reset_state')
        },
          // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                commit('reset_state')
                resolve()
            })
        },
    }
}

export default user