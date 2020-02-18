import {
    getMovieListAPI,
    getByMovieIdAPI,
    getCountOfMoviesAPI,
    searchByKeywordAPI
} from '@/api/movie'

import {
    getTagsMapAPI
} from '@/api/tag'

import {
    insertOrUpdateRateAPI
} from '@/api/rate'
import { message } from 'ant-design-vue'
import store from '@/store'

const movie = {
    state: {
        movieList: {

        },
        tagList: {

        },
        movieListParams: {
            tag: 'hot',
            pageNo: 0,
            pageSize: 12
        },
        movieListLoading: true,
        currentTag: 'hot',
        currentMovieId: '',
        currentMovieInfo: {

        },
        recommendMovieList: {

        },
        koubeiMovieList: {

        },
        orderLoading: true,
        searchParams: {
            keyword: '',
            pageNo: 0,
            pageSize: 8
        },
        searchMovieRes: {
            totalElements: 1
        },
        searchLoading: true,
        rateParams: {
           rate: 0
        }
    },
    mutations: {
        set_movieList: function(state, data) {
            state.movieList = data
        },
        set_tagList: function(state, data) {
            state.tagList = data
        },
        set_movieListParams: function(state, data) {
            state.movieListParams = {
                ...state.movieListParams,
                ...data
            }
        },
        set_movieListLoading: function(state, data) {
            state.movieListLoading = data
        },
        set_recommendMovieList: function(state, data){
            state.recommendMovieList = {
                ...state.recommendMovieList,
                ...data
            }
        },
        set_koubeiMovieList: function(state, data) {
            state.koubeiMovieList = {
                ...state.koubeiMovieList,
                ...data
            }
        },
        set_orderLoading: function(state, data) {
            state.orderLoading = data
        },
        set_currentTag: function(state, data) {
            state.currentTag = data
        },
        set_currentMovieId: function(state, data) {
            state.currentMovieId = data
        },
        set_currentMovieInfo: function(state, data) {
            state.currentMovieInfo = {
                ...state.currentMovieInfo,
                ...data
            }
        },
        set_searchParams: function(state, data) {
            state.searchParams = {
                ...state.searchParams,
                ...data
            }
        },
        set_searchMovieRes: function(state, data) {
            state.searchMovieRes = {
                ...state.searchMovieRes,
                ...data
            }
        },
        set_searchLoading: function(state, data) {
            state.searchLoading = data
        },
        set_rateParams: function(state, data) {
            state.rateParams = {
                ...state.rateParams,
                ...data
            }
        }
        
    },

    actions: {
        getMovieList: async({commit, state}) => {
            commit('set_movieListParams',{
                tag: state.currentTag
            })
            const res = await getMovieListAPI(state.movieListParams)
            if(res){
                commit('set_movieList', res)
                commit('set_movieListLoading', false)
            }
        },
        getRecommendMovieList: async({ commit, state }) => {
            const data = {
                tag: 'recommend',
                pageNo: 0,
                pageSize: 10
            }
            const res = await getMovieListAPI(data)
            if(res){
                commit('set_recommendMovieList', res)
                commit('set_orderLoading', false)
            }
        },
        getKoubeiMovieList: async({ commit }) => {
            const data = {
                tag: 'recommend',
                pageNo: 1,
                pageSize: 10
            }
            const res = await getMovieListAPI(data)
            if(res) {
                commit('set_koubeiMovieList', res)
                commit('set_orderLoading', false)
            }
        },
        getByMovieId: async({commit, state}) => {
            const res = await getByMovieIdAPI({
                movieId: state.currentMovieId
            })
            if(res){
                commit('set_currentMovieInfo', res)
                commit('set_rateParams',{
                    rate: state.currentMovieInfo.myRate/2
                })
            }
        },
        getTagsMap: async({ commit, dispatch }) => {
            const res = await getTagsMapAPI()
            if(res){
                commit('set_tagList', res)
                dispatch('getMovieList')
            }
        },
        searchMovieList: async({ state, commit }) => {
            commit('set_searchMovieRes', {
                content: []
            })
            commit('set_searchLoading', true)
            const res = await searchByKeywordAPI(state.searchParams)
            if(res){
                commit('set_searchMovieRes', res)
                commit('set_searchLoading', false)
            }
        },
        insertOrUpdateRate: async({ state }) => {
            const data = {
                rate: state.rateParams.rate * 2,
                createTime: '',
                id: 0,
                userId: store.state.user.userId,
                updateTime: '',
                movieId: state.currentMovieId
            }
            const res = await insertOrUpdateRateAPI(data)
            if(res){
                message.success('已提交打分')
            }
        },
       
    }
}

export default movie