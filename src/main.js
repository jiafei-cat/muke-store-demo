// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import axios from 'axios'
Vue.config.productionTip = false

/**
 * =========================================================
 *                      [公共模块引入]
 * =========================================================
 */
import './util/filter'
import './util/components'

Vue.use(VueLazyload, {
    loading: '/static/loading-svg/loading-cylon-red.svg'
})
Vue.use(infiniteScroll)

Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})