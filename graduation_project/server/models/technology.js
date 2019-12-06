let mongoose = require('mongoose')

let technologys = new mongoose.Schema({
    "title":String,
    "overview":String,
    "content":Array
})

module.exports = mongoose.model('Technologys', technologys)