let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userPwd: String,
    orderList: Array,
    cartList: [
        {
            productImage: String,
            salePrice: String,
            productName: String,
            productId: String,
            productNum: String,
            checked: String
        }
    ]
})
module.exports = mongoose.model('users', userSchema)