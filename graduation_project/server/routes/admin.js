var express = require('express');
var router = express.Router();
var Admin = require('../models/admin')
var User = require('../models/user')
var Comment = require('../models/comment')
var Rec = require('../models/recruitment')
require('./../util/util')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//管理员登录
router.post('/admin/login', function(req, res, next) {
    let param = {
        adminName: req.body.adminName,
        adminPwd: req.body.adminPwd
    }
    Admin.findOne(param, function(err, doc) {
        if (err) {} else {
            if (doc) {
                res.cookie("adminId", doc._id, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.cookie("adminName", doc.adminName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.json({
                    status: '200',
                    msg: '登录成功',
                    result: {
                        "adminName": doc.adminName
                    }
                })
            } else {
                res.json({
                    status: '401',
                    msg: '请输入正确的管理密码',
                    result: ""
                })

            }
        }
    })

});
//管理员退出
router.post('/admin/logout', function(req, res, next) {
    res.cookie("adminId", '', {
        path: '/',
        maxAge: -1
    })
    res.json({
        status: '200',
        msg: '',
        result: ""
    })
});
//检查是否登录
router.get('/admin/checkLogin', function(req, res, next) {
    if (req.cookies.adminId) {
        res.json({
            status: '200',
            msg: '',
            result: req.cookies.adminName
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })
    }
});
//用户管理:获取所有注册的用户信息(图用)
router.get('/userAdmin',function (req,res,next) {
    nowDate=new Date().getFullYear()
    searchDate=nowDate+'-01-01 00:00:00'
    User.find({createDate:{$gte:searchDate}},function (err,doc) {
        if (err) {
                            res.json({
                                status: '503',
                                msg: err.message,
                                result: '查询失败'
                            })
                        } else {
        
                            if (doc) {
                                User.aggregate(  
                                    [     
                                        {   $project : { month : {$substr: ["$createDate", 5, 2] }}},          
                                        {   $group   : { _id : "$month",  number : { $sum : 1 }}},
                                        {   $sort    : { _id : 1 }}               
                                    ]  
                                ,function (err,data) {
                                    if(data){
                                    res.json({
                                     status:'200',
                                     msg:'查询成功',
                                     result:data
                            })
                                    }
                                })  
                           
                            }
                        }
    })
})
//用户管理:获取所有注册的用户信息(表格用)
router.get('/userAdminTab',function (req,res,next) {
    User.find({},{userId:1,userName:1,email:1,createDate:1},function (err,doc) {
        if (err) {
                            res.json({
                                status: '503',
                                msg: err.message,
                                result: '查询失败'
                            })
                        } else {
        
                            if (doc) {
                                res.json({
                                    status:'200',
                                    msg:'查询成功',
                                    result:doc
                           })
                           
                            }
                        }
    })
})
//用户管理:注销已注册的用户信息(表格用)
router.post('/userAdminTab',function (req,res,next) {
    let id=req.body.id
    User.deleteOne({_id:id},function (err,doc) {
        if (err) {
                            res.json({
                                status: '503',
                                msg: err.message,
                                result: '删除失败'
                            })
                        } else {
                            console.log(doc);
                            res.json({
                                status: '200',
                                result: '删除成功'
                            })
                        }
    })
})
//用户管理:获取所有订单信息
router.get('/orderAdmin', function(req, res, next) {
        User.find({},function (err,doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: '查询失败'
                })
            } else {
                if (doc) {
                    let allOrder=[]
                   doc.forEach((item)=>{
                       if(item.orderList.length>0){
                    allOrder.push(item.orderList)
                       }
                   })
                   res.json({
                    status:'200',
                    msg:'查询成功',
                    result:allOrder
                })
                }
            }
        })
});
//用户管理：处理订单发货
router.post('/orderAdmin',function (req,res,next) {
    let id=req.body.id
    let userId=req.body.userId 
    // User.findOne({
    //     'userId': userId,
    // })
    // .then(doc => {
    //     if (doc) {
    //         doc.orderList.forEach(item => {
    //             if(item.orderId==id){
    //             item.orderStatus= '0'}
    //         })
    //         console.log(doc.orderList);
    //         doc.save(function(err, data) {
    //             if (err) {
    //                 res.json({
    //                     status: '503',
    //                     msg: err.message,
    //                     result: ''
    //                 })
    //             } 
    //             if(data)
    //             {
    //                 res.json({
    //                     status: '200',
    //                     msg: '',
    //                     result: data
    //                 })
    //             }
    //         })
    //     }
    // })
    User.update({
        'userId': userId,
        'orderList.orderId':id

    }, {
        'orderList.$.orderStatus':'0'
    })
    .then(doc => {
        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result: '成功'
            })
        }
    })
})
//用户管理：获取留言内容
router.get('/commentAdmin',function (req,res,next) {
    Comment.find({},function (err,doc) {
        if (err) {
                            res.json({
                                status: '503',
                                msg: err.message,
                                result: '查询失败'
                            })
                        } else {
        
                            if (doc) {
                                res.json({
                                    status:'200',
                                    msg:'查询成功',
                                    result:doc
                           })
                           
                            }
                        }
    })
})
//用户管理:删除留言
router.delete('/commentAdmin',function (req,res,next) {
    let _id=req.body._id
    console.log(_id);
    Comment.deleteOne({_id:_id},function (err,doc) {
        if (err) {
                            res.json({
                                status: '503',
                                msg: err.message,
                                result: '删除失败'
                            })
                        } else {
                            console.log(doc);
                            res.json({
                                status: '200',
                                result: '删除成功'
                            })
                        }
    })
})
//用户管理：修改留言内容
router.post('/commentAdmin',function (req,res,next) {
    let message=req.body.message
    let _id=req.body._id
    Comment.updateOne({
        '_id': _id,
    }, {
        messageText:message
    })
    .then(doc => {
        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result: doc
            })
        }
    })
})
//用户管理:删除招聘信息
router.delete('/school/recruitAdmin',function (req,res,next) {
    let reId=req.body.reId
   Rec.updateOne({},{$pull:{'school': {"reId":reId}}},function (err,data) {
    if(err){
        res.json({
            status: '503',
            msg: '',
            result: '删除失败'
        })
    }else{
        res.json({
            status: '200',
            msg: '',
            result: '删除成功'
        })
    }
   })
})
router.delete('/social/recruitAdmin',function (req,res,next) {
    let reId=req.body.reId
   Rec.updateOne({},{$pull:{'social': {"reId":reId}}},function (err,data) {
    if(err){
        res.json({
            status: '503',
            msg: '',
            result: '删除失败'
        })
    }else{
        res.json({
            status: '200',
            msg: '',
            result: '删除成功'
        })
    }
   })
})
router.delete('/overseas/recruitAdmin',function (req,res,next) {
    let reId=req.body.reId
   Rec.updateOne({},{$pull:{'overseas': {"reId":reId}}},function (err,data) {
    if(err){
        res.json({
            status: '503',
            msg: '',
            result: '删除失败'
        })
    }else{
        res.json({
            status: '200',
            msg: '',
            result: '删除成功'
        })
    }
   })
})
//用户管理：修改招聘信息
router.post('/school/recruitAdmin',function (req,res,next) {
    let data=req.body.data
    Rec.updateOne({
        'school.reId':data.reId
    }, 
        {$set:{"school.$":data} } ,
    )
    .then(doc => {

        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result:'修改成功'
            })
        }
    })
})
router.post('/social/recruitAdmin',function (req,res,next) {
    let data=req.body.data
    console.log(data.reId);
    Rec.updateOne({
        'social.reId':data.reId
    }, 
        {$set:{"social.$":data} } ,
    )
    .then(doc => {

        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result:'修改成功'
            })
        }
    })
})
router.post('/overseas/recruitAdmin',function (req,res,next) {
    let data=req.body.data
    console.log(data.reId);
    Rec.updateOne({
        'overseas.reId':data.reId
    }, 
        {$set:{"overseas.$":data} } ,
    )
    .then(doc => {

        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result:'修改成功'
            })
        }
    })
})
//用户管理:添加招聘信息
router.post('/school/recruitAdmin1',function (req,res,next) {
    let data=req.body.data
    var r3 = Math.floor(Math.random() * 1000)
    data.reId='22'+r3
    Rec.update({
    }, 
        {$push:{"school":data} } ,
    )
    .then(doc => {

        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result:'添加成功'
            })
        }
    })
})
//用户管理:添加招聘信息
router.post('/social/recruitAdmin1',function (req,res,next) {
    let data=req.body.data
    var r3 = Math.floor(Math.random() * 1000)
    data.reId='22'+r3
    Rec.update({
    }, 
        {$push:{"social":data} } ,
    )
    .then(doc => {

        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result:'添加成功'
            })
        }
    })
})
//用户管理:添加招聘信息
router.post('/overseas/recruitAdmin1',function (req,res,next) {
    let data=req.body.data
    var r3 = Math.floor(Math.random() * 1000)
    data.reId='22'+r3
    Rec.update({
    }, 
        {$push:{"overseas":data} } ,
    )
    .then(doc => {

        if (doc) {
            res.json({
                status: '200',
                msg: '',
                result:'添加成功'
            })
        }
    })
})
module.exports = router;