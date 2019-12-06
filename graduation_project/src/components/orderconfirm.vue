<template>
  <div>
 <nav-bread class="nav"> <span>确认订单</span></nav-bread>
    <div class="container">
      <div class="checkout-order">
        <!-- process step -->
        <div class="check-step">
              <ul>
                <li class="cur"><span>确认</span>配送地址</li>
                <li class="cur"><span>核查</span>订单</li>
                <li><span>支</span> 付</li>
                <li><span>订单</span> 完成</li>
              </ul>
            </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>订单详情</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>商品</li>
                <li>价格表</li>
                <li>数量</li>
                <li>总计</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList" :key=item.productId v-if="item.checked==1">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.productImage" :alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice|currency('$')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">X{{item.productNum}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">有库存</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.salePrice*item.productNum|currency('$')}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>商品总额:</span>
                <span>{{subTotal|currency('$')}}</span>
              </li>
              <li>
                <span>配送费:</span>
                <span>{{shipping|currency('$')}}</span>
              </li>
              <li>
                <span>折扣:</span>
                <span>{{discount|currency('$')}}</span>
              </li>
              <li>
                <span>税金:</span>
                <span>{{tax|currency('$')}}</span>
              </li>
              <li class="order-total-price">
                <span>订单总额:</span>
                <span>{{orderTotal|currency('$')}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <router-link class="btn btn--m" to='/address'>上一步</router-link>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="pay">完成订单</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBread from './navBread'
import modalss from './modal'
  export default{
      data(){
          return{
              cartList:[],
              shipping:10,
              discount:20,
              tax:5,
              subTotal:0,
              orderTotal:0
          }
      },
       components:{
          modalss,
          navBread
      },
      mounted(){
          this.init()
      },
      methods:{
          init(){
              this.$axios.get('users/cart')
              .then(res=>{
                  this.cartList=res.data.result
                  this.cartList.forEach(item=>{
                      if(item.checked=='1'){
                          this.subTotal+=item.salePrice*item.productNum
                      }
                  })
                  this.orderTotal=this.subTotal+this.shipping-this.discount+this.tax
              })
          },
          pay(){
             var addressId= this.$route.query.addressId;
              this.$axios.post('users/pay',{
                  addressId:'',
                  orderTotal:this.orderTotal,
                  addressId:addressId
              }).then(res=>{
                  if(res.data.status=='0'){
                    this.$router.push({
                        path:'/orderSuccess?orderId='+res.data.result.orderId
                    })
                  }
              })
          }
      }
  }
</script>
<style>
.nav{
    clear: both;
}
</style>
