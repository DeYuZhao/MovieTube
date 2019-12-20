// import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: '',
  withCredentials: true
})

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

service.interceptors.response.use((response) => {
  if (response.data) {
    return response.data
  }
})

export {
  installer as VueAxios,
  service as axios
}
