var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var pro = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String
});
module.exports = mongoose.model("Goods", pro)