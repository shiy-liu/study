<template>
    <div>
 <nav-bread class="nav"> <span>订单完成</span></nav-bread>
      <div class="container">
        <!-- 进度条 -->
      <div class="check-step">
              <ul>
                <li class="cur"><span>确认</span>配送地址</li>
                <li class="cur"><span>核查</span>订单</li>
                <li class="cur"><span>支</span> 付</li>
                <li class="cur"><span>订单</span> 完成</li>
              </ul>
            </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3><br>您的订单已成功提交！</h3>
            <p>
              <span>订单编号：{{orderList.orderId}}</span>
              <span>订单总额：{{orderList.orderTotal|currency('$')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">我的购物车</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/order">我的订单</router-link>
              </div>
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
            return{
                orderList:[]
            }
        },
        components:{
          navBread
      },
      mounted() {
          this.init()
      },
      methods:{
          init(){
              let orderId=this.$route.query.orderId
              this.$axios.get('users/orderSuc',{
                params:{orderId:orderId}
              })
              .then(res=>{
                  if(res.data.status=='0')
                  this.orderList=res.data.result
              })
          }
      }
    }
</script>
