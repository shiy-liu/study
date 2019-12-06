import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'
//产品
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/product.css'
import '@/assets/css/base.css'
import { currency } from './util/currency'
//引入UI框架Vuetify进行页面响应式布局
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//发送http请求
import Axios from 'axios'
Vue.prototype.$axios = Axios;
Vue.use(Vuetify)
Vue.use(infiniteScroll)
//产品
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: '/static/loading-spokes.svg',
  attempt: 1
})
Vue.filter('currency', currency);
Vue.config.productionTip = false
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    if ((!store.state.nickName && (to.path === '/cart' || to.path === '/order'||to.path==='admin/userAdmin'))||(store.state.nickName!='admin'&&to.path==='/admin/userAdmin')) {
      next({ path: '/' })
    } else{
      next()
     
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
