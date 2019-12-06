var express = require('express');
var mongoose = require('mongoose')
var Goods = require('../models/goods')
let User = require('./../models/user');
var router = express.Router();
//连接数据库 
mongoose.connect('mongodb://127.0.0.1:27017/belstar', { useNewUrlParser: true })
mongoose.connection.on('connected', function() {
    console.log('安排上了');
})
mongoose.connection.on('error', function() {
    console.log('出错了');
})
mongoose.connection.on('disconnected', function() {
        console.log('走了，老哥');
    })
    /* GET users listing. */
    //渲染页面的数据 分页  排序  筛选
router.get('/list', function(req, res, next) {
    let params = {}
    let page = parseInt(req.param("page"))
    let pageSize = parseInt(req.param('pageSize'))
    let sort = req.param('sort')
    let priceLevel = req.param('priceLevel')
    let skip = (page - 1) * pageSize
    let max = ''
    let min = ''
    if (priceLevel != 'all') {
        if (priceLevel == '0') {
            min = 0
            max = 100
        } else if (priceLevel == '1') {
            min = 100
            max = 500
        } else if (priceLevel == '2') {
            min = 500
            max = 1000
        } else {
            min = 1000
            max = 2000
        }
        params = {
            salePrice: {
                $gt: min,
                $lte: max
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({ 'salePrice': sort })
    goodsModel.exec(function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "1",
                msg: '',
                result: {
                    count: doc.length,
                    list: doc

                }

            })
        }
    })
});
//商品添加购物车
router.post('/addcar', function(req, res, next) {
    // let userId = '100000077';
    let userId = req.cookies.userId
    let productId = req.body.productId
    let wy = []
    User.findOne({ userId: userId })
        .then(function(doc) {
            if (doc) {
                wy = doc
                gooditem = ''
                wy.cartList.forEach(function(item) {
                    if (item.productId == productId) {
                        gooditem = item
                        item.productNum++
                    }
                })
                if (gooditem) {
                    return wy.save()
                        .then(function() {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'successfully'
                            })
                        })
                } else {
                    return Goods.findOne({ productId: productId })
                        .then(function(doc2) {
                            newdoc = { //新创建一个对象，实现转换mongoose不能直接增加属性的坑
                                productNum: "1",
                                checked: "1",
                                productId: doc2.productId,
                                productName: doc2.productName,
                                salePrice: doc2.salePrice,
                                productImage: doc2.productImage,
                            }
                            wy.cartList.push(newdoc)
                            return wy.save()
                        })
                        .then(function() {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'successfully'
                            })
                        })
                }
            }
        }).catch(function(err) {
            console.log(err);
        })
})
module.exports = router;