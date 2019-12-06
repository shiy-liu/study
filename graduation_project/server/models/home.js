let mongoose = require('mongoose')

let homes = new mongoose.Schema({
    "DocumentEngineering":Array,
    "feature":Array,
    "workingScene":Array,
    "promble":Array,
    "solution":[{
        "title":String,
        "body":String
    }],
    "contactUs":{
        "customerService":String,
        "centerCall":String,
        "address":String

    }
})

module.exports = mongoose.model('Homes', homes)