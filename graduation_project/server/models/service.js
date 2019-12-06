let mongoose = require('mongoose')

let services = new mongoose.Schema({
        "services":String,
        "content":Array,
        "type":String
})

module.exports = mongoose.model('Services', services)