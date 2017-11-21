import vue from 'vue'
import * as fliter from './filter'
for (let i in fliter) {
    vue.filter(i, fliter[i])
}
