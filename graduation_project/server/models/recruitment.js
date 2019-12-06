let mongoose = require('mongoose')

let recruitments = new mongoose.Schema({
    "school":[{
      "workPlace":String,
      "recruitmentPosition":String,
      "jobResponsibilities":Array,
      "reId":String
    }],
    "social":[{
        "workPlace":String,
        "recruitmentPosition":String,
        "jobResponsibilities":Array,
        "reId":String
    }],
    "overseas":[{
      "workPlace":String,
      "recruitmentPosition":String,
      "jobResponsibilities":Array,
      "reId":String
    }]
})

module.exports = mongoose.model('Recruitments', recruitments)