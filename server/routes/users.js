let express = require('express')
let router = express.Router()

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
            console.log(doc)
            console.log(doc.addressList)
            res.json({
                status: '0',
                msg: '',
                result: doc
            })
        }
    })
})

module.exports = router
