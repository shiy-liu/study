var express = require('express');
var router = express.Router();
var About = require('../models/about')
require('../util/util')
//获取公司沿革信息
router.get('/about/history',function (req,res,next) {
    About.find(function(err,doc){
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
                    result:doc[0].history
                })
            }
        }
    })
})
//获取公司简介信息
router.get('/about/introduction',function (req,res,next) {
    About.find(function(err,doc){
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
                    result:doc[0].introduction
                })
            }
        }
    })
})
//获取公司企业文化信息
router.get('/about/culture',function (req,res,next) {
    About.find(function(err,doc){
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
                    result:doc[0].culture
                })
            }
        }
    })
})
module.exports = router;