import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' // logger

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export default store