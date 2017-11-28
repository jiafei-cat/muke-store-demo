// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'              // 懒加载插件
import infiniteScroll from 'vue-infinite-scroll'    // 滚动插件
import VuexRouterSync from 'vuex-router-sync'       // 基于Vuex和Router插件 [store可以调用路由参数插件]

Vue.config.productionTip = false // 生产提示

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

VuexRouterSync.sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})