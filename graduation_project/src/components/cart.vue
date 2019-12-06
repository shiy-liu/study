<template>
<div @ee="init">
 <nav-bread class="nav"> <span>购物车</span></nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>我的购物车</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>商品</li>
                <li>价格</li>
                <li>数量</li>
                <li>总价</li>
                <li>编辑</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList" :key="item.ProductId">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" :class="{'check':item.checked=='1'}" @click="edit('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/'+item.productImage">
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
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="edit('jian',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="edit('jia',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.productNum*item.salePrice|currency('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delConfirm(item.productId)">删除</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="toggleCheckAll">
                  <span class="checkbox-btn item-check-btn" :class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>选择所有</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                商品总额: <span class="total-price">{{totalPrice|currency('$')}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis':checkCount==0}" @click="goAddress">去结算</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modalss :mdShow='mdShowDel' @close="closeModal">
  <p slot="message">
        确定删除吗？好不容易存的啊
    </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delCart">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="mdShowDel=false">关闭</a>
        </div>
    </modalss>
         <modalss :mdShow='mdShow' @close="closeModal">
        <p slot="message">
          请先登录，否则无法查看购物车
        </p>
        <div slot='btnGroup'>
          <a href="javascript:;" @click="mdShow=false" class="btn btn--m">关闭</a>
        </div>
      </modalss>
</div>
</template>
<style>
.nav {
    clear: both;
}
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
  .container{
    margin-top: -20px;
  }
</style>
<script>
import '@/assets/css/checkout.css'
import navBread from './navBread'
import modalss from './modal'
    export default{
        data(){
            return{
                cartList:[],
                mdShowDel:false,
                productId:'',
                mdShow:false
            }
        },
        components:{
            navBread,
            modalss
        },
        mounted(){
            this.init()
        },
         computed:{
            checkAllFlag(){
                return this.checkCount==this.cartList.length
            },
            checkCount(){
                let i=0
                this.cartList.forEach(item=>{
                    if(item.checked=='1'){
                        i++
                    }
                })
                   return i
            },
            totalPrice(){
                var money=0
                this.cartList.forEach(item=>{
                    if(item.checked=='1'){
                    money+=parseFloat(item.salePrice)*parseInt(item.productNum)
                    }
                })
                return money
            },
            nickName(){
                return this.$store.state.nickName
            }

        },
        methods:{
            init(){
                this.$axios.get('users/cart')
                .then(res=>{
                    if(res.data.status=='403'){
                        this.mdShow=true
                        return
                    }
                    this.cartList=res.data.result
                })
                
            },
            closeModal(){
                this.mdShowDel=false
                this.mdShow=false
            },
            delConfirm(id){
               this.mdShowDel=true
               this.productId=id
            },
            //删除
            delCart(){
                this.$axios.post('users/cartDel',{
                    productId:this.productId
                })
                .then(res=>{
                    if(res.data.status=='0'){
                        //关闭模态框
                        this.mdShowDel=false
                        //重新调接口，渲染页面
                        this.init()
                    }
                })
            },
            //修改数量
            edit(flag,item){
                if(flag=='jia'){
                    item.productNum++
                }
                else if(flag=="checked"){
                    item.checked=item.checked=='1'?'0':'1'
                }
                else{
                    if(item.productNum<=1){
                        return
                    }
                    item.productNum--
                }
                this.$axios.post('users/edit',{
                    productId:item.productId,
                    productNum:item.productNum,
                    checked:item.checked
                })
                .then(res=>{
                    if(res.data.status=='0'){
                        this.init()
                    }
                })
            },
            toggleCheckAll(){
               let flag=!this.checkAllFlag
                this.cartList.forEach(item=>{
                    item.checked=flag?'1':'0'
                })
                this.$axios.post('users/editcheckAll',{
                    checkAll:flag
                })
                .then(res=>{
                    if(res.data.status=='0'){
                        this.init()
                    }
                })
            },
            goAddress(){
                if(this.checkCount==0){
                    return
                }
                else{
                   this.$router.push({
                       path:'/address'
                   })
                }
            }
        }
    }
    document.onselectstart=new Function("return false");
</script>
