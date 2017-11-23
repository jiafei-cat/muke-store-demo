/**
 * =========================================================
 *                      [公共filter]
 * =========================================================
 */
import Vue from 'vue'
import * as filters from './filter'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器