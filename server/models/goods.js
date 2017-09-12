var mongoose = require('mongoose')
var Schema = mongoose.Schema
// 创建数据模型
var productSchema = new Schema({
    'productId': String,
    'productName': String,
    'salePrice': Number,
    'productImage': String
})

module.exports = mongoose.model('goods', productSchema)