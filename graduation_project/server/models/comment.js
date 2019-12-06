let mongoose = require('mongoose')

let comments = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "messageText":String,
    "time":Date
})

module.exports = mongoose.model('Comments', comments)