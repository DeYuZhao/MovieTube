import { axios } from '@/utils/request'
const api = {
    ratePre: '/api/rate'
}

export function insertRateAPI(data){
    return axios({
        url: `${api.ratePre}/insertRate`,
        method: 'POST',
        data
    })
}
export function updateRateByIdAPI(data) {
    return axios({
        url: `${api.ratePre}/updateRateById`,
        method: 'POST',
        data
    })
}