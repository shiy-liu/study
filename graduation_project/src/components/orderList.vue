<template>
    <div>
 <nav-bread class="nav"> <span>我的订单</span></nav-bread>
  <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>我的订单列表</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>物品</li>
                <li>数量</li>
                <li>总价</li>
                <li>收货地址</li>
                <li>创建日期</li>
                <li>订单状态</li>
              </ul>
            </div>
            <div v-show="orderList==''?true:false" style="text-align:center">暂无订单！</div>
            <ul class="cart-item-list">
              <li v-for="(item) in orderList" :key=item.orderId>
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.goodsList[0].productImage">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.goodsList[0].prodcutName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.goodsList.length}}</div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.orderTotal}}</div>
                </div>
                 <div class="cart-tab-4">
                  <div class="item-price-total">{{item.addressInfo}}</div>
                </div>
                 <div class="cart-tab-4">
                  <div class="item-price-total">{{item.createDate}}</div>
                </div>
                 <div class="cart-tab-4">
                  <div class="item-price-total">{{item.orderStatus==1?'未发货':'已发货'}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import navBread from './navBread'
    export default{
        data(){
            return {
                orderList:[],
                goodsList:[]
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            init(){
                this.$axios.get('users/orderList')
                .then(res=>{
                    if(res.data.status=='0'){
                        this.orderList=res.data.result;
                        this.orderList.forEach(item=>{
                    this.goodsList=this.goodsList.concat(item.goodsList)
                            
                        })
                       
                        console.log(this.orderList);
                    }
                })
            }
        },
        components:{
            navBread
        }
    }
</script>
<style>
    .nav{
        clear:both
    }
</style>