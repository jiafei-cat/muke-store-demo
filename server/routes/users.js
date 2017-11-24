let express = require('express')
let router = express.Router()
require('./../util/')
let User = require('../models/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource')
})

router.post('/login', function(req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (userDoc) {
                res.cookie('userId', userDoc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.cookie('userName', userDoc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                // req.session.user = userDoc
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: userDoc.userName
                    }
                })
            } else {
                res.json({
                    status: '1',
                    msg: '用户名或者密码错误'
                })
            }
        }
    })
})

router.post('/logout', (req, res, next) => {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1
    })
    res.json({
        status: '0',
        msg: '',
        result: ''
    })
})

router.get('/checkLogin', (req, res, next) => {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: ' ',
            result: req.cookies.userName || ''
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })
    }
})

// 查询购物车
router.get('/cartlist', (req, res, next) => {
    let userId = req.cookies.userId
    User.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.cartList
                })

            }
        }
    })
})

// 删除商品
router.post('/cart/del', (req, res, next) => {
    let userId = req.cookies.userId
    let productId = req.body.productId
    User.update({
        userId: userId
    }, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            })
        }
    })
})

// 编辑购物车
router.post('/cartEdit', (req, res, next) => {
    let {cookies: {userId}, body: {productId, productNum, checked, allChecked}} = req
    if (productId) {
        User.update({
            userId: userId,
            'cartList.productId': productId
        }, {
            'cartList.$.productNum': productNum,
            'cartList.$.checked': checked
        }, (err, doc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                res.json({
                    status: '0',
                    msg: '',
                    result: 'success'
                })
            }
        })
    } else {
        User.findOne({userId}, (err, doc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                if (doc) {
                    doc.cartList.forEach((item) => {
                        item.checked = allChecked
                    })
                    doc.save((saveErr, saveDoc) => {
                        if (saveErr) {
                            res.json({
                                status: '1',
                                msg: saveErr.message
                            })
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'success'
                            })
                        }
                    })
                }
            }
        })
    }
})

router.get('/addressList', (req, res, next) => {
    let userId = req.cookies.userId
    User.findOne({userId}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc.addressList
            })
        }
    })
})

// 设置默认地址
router.post('/addressList/setDefault', (req, res, next) => {
    let {cookies: {userId}, body: {id}} = req
    if (!id) {
        res.json({
            status: '1003',
            msg: 'id is null',
            result: ''
        })
        return
    }
    User.findOne({userId}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let addressList = doc.addressList
            addressList.forEach((i, k) => {
                i.isDefault = i.addressId === id
            })
            addressList.sort((a, b) => {
                return b.isDefault - a.isDefault
            })
            doc.save((saveErr, saveDoc) => {
                if (saveErr) {
                    res.json({
                        status: '1',
                        msg: saveErr.message
                    })
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: 'success'
                    })
                }
            })
        }
    })
})

// 删除地址
router.post('/addressList/del', (req, res, next) => {
    let userId = req.cookies.userId
    let id = req.body.id
    if (!id) {
        res.json({
            status: '1003',
            msg: 'id is null',
            result: ''
        })
        return
    }
    User.update({
        userId: userId
    }, {
        $pull: {
            'addressList': {
                'addressId': id
            }
        }
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            })
        }
    })
})

router.post('/payMent', (req, res, next) => {
    let {cookies: {userId}, body: {id}} = req
    User.findOne({userId}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let totalMoney = 0, addressList = []
            let goodsList = doc.cartList.filter((i) => {
                return i.checked === '1'
            }).forEach((i) => {
                totalMoney += (i.salePrice * i.productNum)
            })
            let address = doc.addressList.filter((i) => {
                return i.addressId === id
            })

            let platform = '622' 

            let r1 = Math.floor(Math.random() * 10)
            let r2 = Math.floor(Math.random() * 10)

            let sysDate = new Date().Format('yyyyMMddhhmmss')
            let createDate =  new Date().Format('yyyy-MM-dd hh:mm:ss')
            let orderId = platform + r1 + sysDate + r2

            let order = {
                orderId: orderId,
                orderTotal: totalMoney,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                createDate: createDate
            }
            doc.orderList.push(order)
            doc.save((saveErr, saveDoc) => {
                if (saveErr) {
                    res.json({
                        status: '1',
                        msg: saveErr.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                    })
                }
            })
            
        }
    })
})
module.exports = router
