import { axios } from '@/utils/request'

const api = {
    getMovieList: '/api/movie/listByPage', //GET
    getByMovieId: 'api/movie/getByMovieId', //GET
}

export function getMovieListAPI(data){
    return axios({
        url: api.getMovieList,
        method: 'GET',
        data
    })
}

export function getByMovieIdAPI(parameter){
    return axios({
        url: api.getByMovieId,
        method: 'GET',
        params: parameter
    })
}