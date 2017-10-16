let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Goods = require('../models/goods.js')
let Users = require('../models/users.js')
// 连接mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')
// 监听反馈连接状态
mongoose.connection.on('connected', function () {
    console.log('MongoDB connect success')
})
mongoose.connection.on('error', function () {
    console.log('MongoDB connect fail')
})
mongoose.connection.on('disconnected', function () {
    console.log('MongoDB connect disconnected')
})

router.get('/list', function (req, res, next) {
    let page = parseInt(req.param('page'))
    let pageSize = parseInt(req.param('pageSize'))
    let priceLevel = req.param('priceLevel')
    let sort = req.param('sort')
    let skip = (page - 1) * pageSize
    let priceGt = ''
    let priceLte = ''
    let params = {}
    if (priceLevel !== 'all') {
        switch (priceLevel) {
        case '0':
            priceGt = 0
            priceLte = 100
            break
        case '1':
            priceGt = 100
            priceLte = 500
            break
        case '2':
            priceGt = 500
            priceLte = 1000
            break
        case '3':
            priceGt = 1000
            priceLte = 5000
            break
        }
        params = {
            salePrice: {
                $gte: priceGt,
                $lte: priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({ 'salePrice': sort })
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

router.post('/addCart', function (req, res, next) {
    let userId = '100000077'
    let productId = req.body.productId
    Users.findOne({ 'userId': userId }, function (err, userdoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (userdoc) {
                let goodItem = ''
                userdoc.cartList.forEach((item, index) => {
                    if (item.productId == productId) {
                        goodItem = item
                        item.productNum++
                    }
                })
                if (goodItem) {
                    userdoc.save(function (saveErr, saveDoc) {
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
                } else {
                    Goods.findOne({ 'productId': productId }, function (err, doc) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: err.message
                            })
                        } else {
                            if (doc) {
                                doc._doc.productNum = 1
                                doc._doc.checked = 1
                                userdoc.cartList.push(doc)
                                userdoc.save(function (saveErr, saveDoc) {
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
            }

            // res.send(doc)
        }
    })
})
module.exports = router