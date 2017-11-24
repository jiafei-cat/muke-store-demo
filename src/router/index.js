import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import address from '@/views/address'
import orderConfirm from '@/views/orderConfirm'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'GoodsList',
            component: GoodsList
        }, {
            path: '/cart',
            name: 'Cart',
            component: Cart
        }, {
            path: '/address',
            name: 'address',
            component: address
        }, {
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: orderConfirm
        }
    ]
})