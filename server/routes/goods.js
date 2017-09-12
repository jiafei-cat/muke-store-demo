let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Goods = require('../models/goods.js')
// 连接mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')
// 监听反馈连接状态
mongoose.connection.on('connected', function() {
    console.log('MongoDB connect success')
})
mongoose.connection.on('error', function() {
    console.log('MongoDB connect fail')
})
mongoose.connection.on('disconnected', function() {
    console.log('MongoDB connect disconnected')
})

router.get('/', function(req, res, next) {
    let page = parseInt(req.param('page'))
    let pageSize = parseInt(req.param('pageSize'))
    let sort = req.param('sort')
    let skip = (page - 1) * pageSize
    let params = {}
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({'salePrice': sort})
    goodsModel.exec(function(err, doc) {
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

module.exports = router