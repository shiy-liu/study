var express = require('express');
var router = express.Router();
var User = require('../models/user')
require('./../util/util')
    /* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
//用户注册
router.post('/reg', function(req, res, next) {
    var regName = req.body.userName
    var regPwd = req.body.userPwd
    var regEma=req.body.userEmail
    let param = {
        email: regEma
    }
    User.findOne(param, function(err, doc) {
        if (err) {} else {
            if (doc) {
                res.json({
                    status: '401',
                    msg: '用户名已存在',
                    result: ''
                })
            } else {
                var r3 = Math.floor(Math.random() * 100)
                var user = {
                    userId: '1003' + r3,
                    userName: regName,
                    userPwd: regPwd,
                    email:regEma,
                    createDate: new Date().Format('yyyy-MM-dd hh:mm:ss')
                }
                User(user).save(function(err, data) {
                    if (err) {
                        res.json({
                            status: '503',
                            msg: '注册失败',
                            result: ''
                        })
                    } else {
                        res.json({
                            status: '200',
                            msg: '注册成功',
                            result: data
                        })
                    }
                })

            }
        }
    })

});
//用户登录
router.post('/login', function(req, res, next) {
    let param = {
        email: req.body.userEmail,
        userPwd: req.body.userPwd
    }
    User.findOne(param, function(err, doc) {
        if (err) {} else {
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.json({
                    status: '200',
                    msg: '登录成功',
                    result: {
                        "userName": doc.userName
                    }
                })
            } else {
                res.json({
                    status: '401',
                    msg: '用户名密码不正确',
                    result: ""
                })

            }
        }
    })

});
//用户退出
router.post('/logout', function(req, res, next) {
    res.cookie("userId", '', {
        path: '/',
        maxAge: -1
    })
    res.cookie("amdinId", '', {
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
router.get('/checkLogin', function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '200',
            msg: '',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })
    }
});

//查找商品
router.get('/cart', function(req, res, next) {
        let userId = req.cookies.userId
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                if (doc) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: doc.cartList
                    })
                }
            }
        })
    })
    //删除商品数据
router.post('/cartDel', function(req, res, next) {
    let userId = req.cookies.userId
    let productId = req.body.productId
    console.log(userId, productId);
    User.update({
        userId: userId
    }, {
        $pull: {
            "cartList": {
                "productId": productId
            }
        }
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'successfully'
            })
        }
    })
});
//更新商品数量
router.post('/edit', function(req, res) {
        let userId = req.cookies.userId
        let productId = req.body.productId
        let productNum = req.body.productNum
        let checked = req.body.checked
        User.update({
                'userId': userId,
                'cartList.productId': productId

            }, {
                'cartList.$.productNum': productNum,
                'cartList.$.checked': checked
            })
            .then(doc => {
                if (doc) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: ''
                    })
                }
            })
    })
    //购物车修改
router.post('/editCheckAll', function(req, res) {
        let userId = req.cookies.userId
        let checkAll = req.body.checkAll ? '1' : '0';
        console.log(checkAll);
        User.findOne({
                'userId': userId,
            })
            .then(doc => {
                if (doc) {
                    doc.cartList.forEach(item => {
                        item.checked = checkAll
                    })
                    doc.save(function(err, data) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: err.message,
                                result: ''
                            })
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'successfully'
                            })
                        }
                    })
                }
            })
    })
    //获得用户地址接口 选择地址用
router.get('/addressList', function(req, res, next) {
    let userId = req.cookies.userId
    User.findOne({ userId: userId })
        .then(doc => {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.addressList
                })
            }
        }).catch(err => {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        })
});

router.post('/setDefault', function(req, res, next) {
    let userId = req.cookies.userId
    let addressId = req.body.addressId
    User.findOne({ userId: userId })
        .then(doc => {
            if (doc) {
                doc.addressList.forEach(item => {
                    if (item.addressId == addressId) {
                        item.isDefault = true
                    } else {
                        item.isDefault = false
                    }
                })
                doc.save(function(err, doc) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: ''
                        })
                    }
                })
            }
        }).catch(err => {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        })
})
router.post('/delAddress', function(req, res, next) {
        let userId = req.cookies.userId
        let addressId = req.body.addressId
        User.update({ userId: userId }, {
            $pull: {
                "addressList": {
                    "addressId": addressId
                }
            }
        }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                res.json({
                    status: '0',
                    msg: '',
                    result: 'successfully'
                })
            }
        })
    })
    //创建订单
router.post('/pay', function(req, res) {
    let userId = req.cookies.userId
    let addressId = req.param('addressId')
    let orderTotal = req.body.orderTotal
    User.findOne({ userId: userId })
        .then(doc => {
            if (doc) {
                var address = '';
                var receiver=''
                var goodsList = [];
                doc.addressList.forEach(item => {
                    console.log(addressId);
                    console.log(item.addressId);
                    if (addressId == item.addressId) {
                        address = item.streetName
                        receiver=item.userName
                    }
                })
                doc.cartList.filter(item => {
                    if (item.checked == '1') {
                        goodsList.push(item)
                    }
                })
                console.log("---------------");
                console.log(address);
                var platform = '543'
                var r1 = Math.floor(Math.random() * 10)
                var r2 = Math.floor(Math.random() * 10)
                var sysDate = new Date().Format('yyyyMMddhhmmss')
                var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
                var orderId = platform + r1 + sysDate + r2
                var order = {
                    orderId: orderId,
                    orderTotal: orderTotal,
                    addressInfo: address,
                    goodsList: goodsList,
                    orderStatus: '1',
                    createDate: createDate,
                    receiver:receiver,
                    userId:userId
                }
                doc.orderList.push(order)
                doc.save(function(err, data) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: {
                                orderId: order.orderId,
                                orderTotal: order.orderTotal
                            }
                        })
                    }
                })
            }
        })
});
//订单完成页面
router.get('/orderSuc', function(req, res) {
        let userId = req.cookies.userId;
        var orderId = req.param('orderId');
        User.findOne({ userId: userId })
            .then(doc => {
                if (doc) {
                    let orderList = doc.orderList
                    let orderTotal = 0
                    let thisOrder = {}
                    var shan = []
                    if (orderList.length > 0) {
                        orderList.forEach(item => {
                                if (orderId == item.orderId) {
                                    thisOrder = item
                                    orderTotal = item.orderTotal
                                }
                            })
                            
                        thisOrder.goodsList.forEach(item=>{
                            doc.cartList.forEach((item3,index)=>{
                                if(item3.productId==item.productId){
                                    doc.cartList.splice(index,1)
                                }
                            })
                        })
                        doc.save(function(err, data) {
                            if (data) {
                                res.json({
                                    status: '0',
                                    msg: '',
                                    result: {
                                        orderId: orderId,
                                        orderTotal: orderTotal
                                    }
                                })
                            } else {
                                res.json({
                                    status: '12001',
                                    msg: '无此订单',
                                    result: ''
                                })
                            }
                        })

                    }

                }
            })
    })
    //添加地址
router.post('/jiaAddress', function(req, res) {
    var userId = req.cookies.userId
    var r4 = Math.floor(Math.random() * 100)
    var addressId = '1000' + r4
    var userName = req.body.userName
    var postCode = req.body.postCode
    var tel = req.body.tel
    var streetName = req.body.streetName
    var isDefault = false
    User.findOne({ userId: userId })
        .then(doc => {
            if (doc) {
                var address = {
                    addressId: addressId,
                    userName: userName,
                    postCode: postCode,
                    tel: tel,
                    streetName: streetName,
                    isDefault: isDefault
                }
                doc.addressList.push(address)
                doc.save(function(err, data) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: '添加成功'
                        })
                    }
                })
            }
        })
});
router.get('/orderList', function(req, res) {
    let userId = req.cookies.userId
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.orderList
                })
            }
        }
    })
})
module.exports = router;