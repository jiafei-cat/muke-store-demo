<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods">Price
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':isShowFilter}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a href="javascript:void(0)" :class="{cur:curFliterIndex=='all'}" @click="curFliterIndex='all'">All</a>
                            </dd>
                            <dd v-for="(item,index) in priceFilter" :key="item.startPrice" @click="curSelect(index)">
                                <a :class="{cur:index==curFliterIndex}" href="javascript:void(0)">{{item.startPrice}} - {{item.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>
                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodsList" :key="item.id">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{ item.productName }}</div>
                                        <div class="price">{{ item.salePrice }}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">加载中...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="isShowFilter" @click="closeFilter"></div>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import '@/assets/styles/base.css'
import '@/assets/styles/product.css'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import axios from 'axios'
export default {
    data() {
        return {
            goodsList: [],
            sortFlag: true,
            page: 1,
            pageSize: 8,
            busy: true,
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '100.00'
                }, {
                    startPrice: '100.00',
                    endPrice: '500.00'
                }, {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                }, {
                    startPrice: '1000.00',
                    endPrice: '2000.00'
                }
            ],
            curFliterIndex: '',
            isShowFilter: false
        }
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread
    },
    mounted() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(flag) {
            let param = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sortFlag ? 1 : -1
            }
            axios.get('/goods', {
                params: param
            }).then((result) => {
                let res = result.data
                if (res.status === '0') {
                    if (flag) {
                        this.goodsList = this.goodsList.concat(res.result.list)
                        if (res.result.count === 0) {
                            this.busy = true
                        } else {
                            this.busy = false
                        }
                    } else {
                        this.goodsList = res.result.list
                        this.busy = false
                    }
                } else {
                    this.goodsList = []
                }
            })
        },
        loadMore() {
            setTimeout(() => {
                this.page++
                this.getGoodsList(true)
            }, 500)
        },
        sortGoods() {
            this.sortFlag = !this.sortFlag
            this.page = 1
            this.getGoodsList()
        },
        curSelect(index) {
            this.curFliterIndex = index
            this.isShowFilter = false
        },
        showFilter() {
            this.isShowFilter = true
        },
        closeFilter() {
            this.isShowFilter = false
        }
    }
}
</script>