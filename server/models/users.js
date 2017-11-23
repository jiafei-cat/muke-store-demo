let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userPwd: String,
    orderList: Array,
    addressList: [
        {
            addressId: String,
            isDefault: Boolean,
            postCode: String,
            streetName: String,
            tel: String,
            userName: String
        }
    ],
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