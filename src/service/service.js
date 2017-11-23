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
export const _login = (data) => request(urls.POST_LOGIN_USER, data, 'POST')
export const _ckLogin = () => request(urls.GET_CKLOGIN_USER, 'GET')

export const _addressList = () => request(urls.GET_ADDRESSLIST_USER, 'GET')