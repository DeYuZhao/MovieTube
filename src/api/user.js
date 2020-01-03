import {axios} from '@/utils/request'

const api = {
    login: 'api/user/login', //登录api
    register: 'api/user/resgister'
}

export function loginAPI(data){
    return axios({
        url:api.login,
        method: 'POST',
        data
    })
}

export function registerAPI(data){
    return axios({
        url:api.register,
        method: 'POST',
        data
    })
}