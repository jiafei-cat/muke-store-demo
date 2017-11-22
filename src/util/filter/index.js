/**
 * =========================================================
 *                      [公共filter]
 * =========================================================
 */
import vue from 'vue'
import * as filter from './filter'
for (let i in filter) {
    vue.filter(i, filter[i])
}
