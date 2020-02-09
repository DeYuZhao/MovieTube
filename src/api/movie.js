import { axios } from '@/utils/request'

const api = {
    moviePre: 'api/movieTag',
}

export function getMovieListAPI(params){
    return axios({
        url: `${api.moviePre}/listByTag`,
        method: 'GET',
        params
    })
}

export function getByMovieIdAPI(params){
    return axios({
        url: `${api.moviePre}/getByMovieId`,
        method: 'GET',
        params
    })
}

//获取电影数量
export function getCountOfMoviesAPI(params){
    return axios({
        url: `${api.moviePre}/getCountOfMovies`,
        method: 'GET',
        params
    })
}
//根据演员姓名搜索
export function listByCastNameAPI(params){
    return axios({
        url: `${api.moviePre}/listByCastName`,
        method: 'GET',
        params
    })
}
//根据导演姓名搜索
export function listByKeywordAPI(params){
    return axios({
        url: `${api.moviePre}/listByKeyword`,
        method: 'GET',
        params
    })
}
//根据电影名称搜索
export function listByMovieName(params){
    return axios({
        url: `${api.moviePre}/listByMovieName`,
        method: 'GET',
        params
    })
}