let mongoose = require('mongoose')

let admins = new mongoose.Schema({
    adminName:String,
    adminPwd:String
})

module.exports = mongoose.model('Admin', admins)