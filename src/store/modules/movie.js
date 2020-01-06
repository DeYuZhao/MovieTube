import {
    getMovieListAPI,
    getByMovieIdAPI
} from '@/api/movie'

const movie = {
    state: {
        movieList: {

        },
        
        movieListParams: {
            pageNo: 1,
            pageSize: 20
        },

        currentMovieId: ''
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
        
    },

    actions: {
        getMovieList: async({commit, state}) => {
            const res = await getMovieListAPI(state.movieListParams)
            if(res){
                commit('set_movieList', res)
                console.log(res.content)
            }
        },
        getByMovieId: async({commit, state}) => {
            const res = await getByMovieIdAPI(state.currentMovieId)
            if(res){
                
            }
        }
    }
}

export default movie