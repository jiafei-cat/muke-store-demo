import { CHANGE_TITLE } from './mutations-type'

export default {
    [CHANGE_TITLE](state, payload) {
        state.title = payload || state.route.path
    }
}