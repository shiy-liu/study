let mongoose = require('mongoose')

let abouts = new mongoose.Schema({
    "history":[{
        color:String,
        year:String,
        content:String
    }],
    "introduction":[{
        "title":String,
        "body":Array    
    }],
    "culture":[{
        "title":String,
        "body":Array
    }]
})

module.exports = mongoose.model('Abouts', abouts)