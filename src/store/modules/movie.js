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
            pageSize: 10
        },
        currentTag: '',
        currentMovieId: '',
        currentMovieInfo: {

        },
        searchMovieListParams: {
            keyword: '',
            pageNo: 1,
            pageSize: 10
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
        set_currentMovieId: function(state, data) {
            state.currentMovieId = data
        },
        set_currentMovieInfo: function(state, data) {
            state.currentMovieInfo = {
                ...state.currentMovieInfo,
                ...data
            }
        },
        set_searchMovieListParams: function(state, data) {
            state.searchMovieListParams = {
                ...state.searchMovieListParams,
                ...data
            }
        }
        
    },

    actions: {
        getMovieList: async({commit, state}) => {
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
                console.log(res)
                dispatch('getMovieList')
            }
        },
        searchMovieList: async({ state, commit }) => {
            const res = await listByKeywordAPI(state.searchMovieListParams)
            if(res){
                commit('set_movieList', res.content)
            }
        }
    }
}

export default movie