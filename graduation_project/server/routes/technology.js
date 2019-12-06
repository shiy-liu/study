var express = require('express');
var router = express.Router();
var Technology = require('../models/technology')
require('../util/util')
//获取技术相关信息
router.get('/info',function (req,res,next) {
    Technology.find(function(err,doc){
        if(err){
            res.json({
            status: '404',
            msg: err.message,
            result: ''
        })
        }
        else {
            if (doc) {
                res.json({
                    status: '200',
                    msg: '请求成功',
                    result:doc
                })
            }
        }
    })
})


module.exports = router;