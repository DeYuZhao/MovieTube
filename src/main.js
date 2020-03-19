import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import '@/permission'
// import smartGesture from './utils/smart-gesture.min.js'
Vue.config.productionTip = false

Vue.use(Antd)
// Vue.use(smartGesture)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
