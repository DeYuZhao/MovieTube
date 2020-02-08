import {
    getMovieListAPI,
    getByMovieIdAPI,
    getCountOfMoviesAPI,
    listByCastNameAPI,
    listByKeywordAPI,
    listByMovieName
} from '@/api/movie'

const movie = {
    state: {
        movieList: {

        },
        movieListParams: {
            pageNo: 1,
            pageSize: 20
        },
        currentMovieId: '',
        currentMovieInfo: {

        }
    },
    mutations: {
        set_movieList: function(state, data) {
            state.movieList = data
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
        }
        
    },

    actions: {
        getMovieList: async({commit, state}) => {
            console.log(state.movieListParams)
            const res = await getMovieListAPI(state.movieListParams)
            if(res){
                commit('set_movieList', res)
            }
        },
        getByMovieId: async({commit, state}) => {
            const res = await getByMovieIdAPI({
                movieId: state.currentMovieId
            })
            if(res){
                commit('set_currentMovieInfo', res)
            }
        }
    }
}

export default movie