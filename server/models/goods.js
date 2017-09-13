let mongoose = require('mongoose')
let Schema = mongoose.Schema
// 创建数据模型
let productSchema = new Schema({
    'productId': String,
    'productName': String,
    'salePrice': Number,
    'productImage': String
})

module.exports = mongoose.model('goods', productSchema)