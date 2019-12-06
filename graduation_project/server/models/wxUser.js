let mongoose = require('mongoose')

let wxuser = new mongoose.Schema({
    "openId": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": Number,
        "productImage": String,
        "checked": String,
        "productNum": String
    }],
    "addressList": [{
        "addressId": String,
        "userName": String,
        "address": String,
        "tel": Number,
        "isDefault": Boolean
    }]
})

module.exports = mongoose.model('Wxuser', wxuser)