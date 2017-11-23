import * as urls from './urls'
import axios from '../../config/http'

function request(url = '', data = {}, type = 'GET', config) {
    type = type.toLowerCase()
    return axios[type](url, data, config).then((respnonse) => {
        return respnonse
    }).catch(function(e) {
        return e
    })
}
// common
export const _ckLogin = () => request(urls.GET_CKLOGIN_USER, 'GET') // 根据COOKIES检测登录
export const _login = (data) => request(urls.POST_LOGIN_USER, data, 'POST') // 登录接口
export const _logout = (data) => request(urls.POST_LOGOUT_USER, data, 'POST') // 登出接口

// goodslist page
export const _goodsList = (data) => request(urls.GET_GOODSLIST_USER, data, 'GET') // 商品列表
export const _addCart = (data) => request(urls.POST_ADDCART_USER, data, 'POST') // 添加商品至购物车

// cartlist page
export const _cartList = (data) => request(urls.GET_CARTLIST_USER, data, 'GET') // 购物车列表
export const _cartDel = (data) => request(urls.POST_CARTDEL_USER, data, 'POST') // 购物车删除
export const _cartEdit = (data) => request(urls.POST_CARTEDIT_USER, data, 'POST') // 购物车编辑

// address page
export const _addressList = () => request(urls.GET_ADDRESSLIST_USER, 'GET') // 用户地址列表
export const _setDefault = (data) => request(urls.POST_SETDEFAULT_USER, data, 'POST') // 设默认地址