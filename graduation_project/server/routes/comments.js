var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')
require('./../util/util')
//获取留言信息
router.get('/messages',function (req,res,next) {
    Comment.find(function(err,doc){
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
                    result: doc
                })
            }
        }
    })
})
//添加留言信息
router.post('/messages',function (req,res,next) {
    let comment={
    "userId":req.cookies.userId,
    "userName":req.cookies.userName,// 用户名
    "messageText" :req.body.messageText,// 留言内容
    "time":new Date().Format('yyyy-MM-dd hh:mm:ss')
    }// 时间
    Comment(comment).save(function(err, data) {
        if (err) {
            res.json({
                status: '503',
                msg: '留言失败',
                result: ''
            })
        } else {
            res.json({
                status: '200',
                msg: '留言成功',
                result: data
            })
        }
    })
})

module.exports = router;