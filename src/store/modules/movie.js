import {
    getMovieListAPI,
    getByMovieIdAPI,
    getCountOfMoviesAPI,
    listByCastNameAPI,
    listByKeywordAPI,
    listByMovieName
} from '@/api/movie'

import {
    getTagsMapAPI
} from '@/api/tag'
const movie = {
    state: {
        movieList: {

        },
        tagList: {

        },
        movieListParams: {
            tag: 'hot',
            pageNo: 1,
            pageSize: 12
        },
        currentTag: 'hot',
        currentMovieId: '',
        currentMovieInfo: {

        },
        searchParams: {
            keyword: '',
            pageNo: 1,
            pageSize: 10
        },
        searchMovieRes: {
            totalElements:1
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
            }
        },
        getByMovieId: async({commit, state}) => {
            const res = await getByMovieIdAPI({
                movieId: state.currentMovieId,
                tag: state.currentTag
            })
            if(res){
                commit('set_currentMovieInfo', res)
            }
        },
        getTagsMap: async({ commit, state, dispatch }) => {
            const res = await getTagsMapAPI()
            if(res){
                commit('set_tagList', res)
                dispatch('getMovieList')
            }
        },
        searchMovieList: async({ state, commit }) => {
            const res = await listByKeywordAPI(state.searchParams)
            if(res){
                commit('set_searchMovieRes', res)
            }
        }
    }
}

export default movie