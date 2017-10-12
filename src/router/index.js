import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Chart from '@/views/Chart'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'GoodsList',
            component: GoodsList
        },
        {
            path: '/chart',
            name: 'Chart',
            component: Chart
        }
    ]
})