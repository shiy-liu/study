var express = require('express');
var router = express.Router();
var Home = require('../models/home')
require('../util/util')
//获取公司信息
router.get('/home',function (req,res,next) {
    Home.find(function(err,doc){
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
                    result:doc[0]
                })
            }
        }
    })
})


module.exports = router;