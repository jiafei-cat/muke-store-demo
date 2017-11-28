<template>
    <div>
        <nav-header></nav-header>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2">
                    <span>check out</span>
                </h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
                <ul>
                    <li class="cur">
                        <span>Confirm</span> address</li>
                    <li class="cur">
                        <span>View your</span> order</li>
                    <li class="cur">
                        <span>Make</span> payment</li>
                    <li class="cur">
                        <span>Order</span> confirmation</li>
                </ul>
            </div>

            <div class="order-create">
                <div class="order-create-pic"><img src="static/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>Congratulations!<br>Your order is under processing!</h3>
                    <h3 @click="change">{{ title }}</h3>
                    <h3>{{ testTitle }}</h3>
                    <p>
                        <span>Order ID：{{ orderId }}</span>
                        <span>Order total：{{ orderTotal | currency('', 2) }}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <router-link :to="{'path': '/cart'}">
                                <a href="javascript:;" class="btn btn--m">Cart List</a>
                            </router-link>
                        </div>
                        <div class="btn-r-wrap">
                            <router-link :to="{'path': '/'}">
                                <a href="javascript:;" class="btn btn--m" @click="router.push({'path': '/'})">Goods List</a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            orderTotal: '',
            orderId: ''
        }
    },
    computed: {
        title() {
            return this.$store.state.title + ' - from state'
        },
        ...mapGetters(['testTitle'])
    },
    mounted() {
        this.pageInit()
    },
    methods: {
        pageInit() {
            this.orderTotal = this.$route.query.orderTotal
            this.orderId = this.$route.query.orderId
        },
        change() {
            // this.$store.commit('CHANGE_TITLE', 'change-for mutations')
            this.$store.commit('CHANGE_TITLE')
        },
        ...mapMutations(['CHANGE_TITLE'])
    }
}
</script>
