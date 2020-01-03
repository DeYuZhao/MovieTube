import { axios } from '@/utils/request'

const api = {
    getMovieList: '/api/movie/listByPage', //GET
}

export function getMovieListAPI(data){
    return axios({
        url: api.getMovieList,
        method: 'GET',
        data
    })
}