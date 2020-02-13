import router from './router'
import store from './store'
import { message } from 'ant-design-vue'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({path: '/'})
        NProgress.done()
      } else {
        const hasGetUserInfo = store.getters.userId
        if (hasGetUserInfo) {
          next()
        } else {
          try {
            // get user info
            await store.dispatch('getUserInfo')
            next()
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('resetToken') 
            // message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })
  
  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
  