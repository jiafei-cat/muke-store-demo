/**
 * =========================================================
 *                      [axios配置]
 * =========================================================
 */
import axios from 'axios'
import qs from 'qs'
import router from './../../src/router/index'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = 'http://localhost:3000' // 配置接口地址
axios.defaults.withCredentials = true // 跨域配置
axios.defaults.crossDomain = true // 跨域配置

// POST传参序列化 - 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    console.error(error)
    return Promise.reject(error)
})

// 返回状态判断 - 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    if (res.data.status === '0') {
        console.log(res.data)
        return Promise.reject(res)
    } else {
        router.push({path: '/'})
    }
    return res
}, (error) => {
    console.error(error)
    return Promise.reject(error)
})

export default axios