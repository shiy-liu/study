var express = require('express');
var router = express.Router();
var Recruitment = require('../models/recruitment')
require('../util/util')
//获取校园招聘信息
router.get('/school',function (req,res,next) {
    Recruitment.find(function(err,doc){
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
                    result:doc[0].school
                })
            }
        }
    })
})
//获取社会招聘信息
router.get('/social',function (req,res,next) {
    Recruitment.find(function(err,doc){
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
                    result:doc[0].social
                })
            }
        }
    })
})
//获取海外招聘信息
router.get('/overseas',function (req,res,next) {
    Recruitment.find(function(err,doc){
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
                    result:doc[0].overseas
                })
            }
        }
    })
})
module.exports = router;