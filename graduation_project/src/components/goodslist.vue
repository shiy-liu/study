<template>
    <div>
        <nav-bread class="nav"> <span>商品</span></nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur">默认</a>
            <a href="javascript:void(0)" class="price" @click="sort">价格{{jiantou}}</a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showPrice">过滤</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':Filter}">
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd><a href="javascript:void(0)" @click="getAll" :class="{'cur':priceChecked=='all'}">所有</a></dd>
                <dd v-for="(item,index) in priceFilter" :key=index @click="setPrice(index)"><a href="javascript:void(0)" :class="{'cur':priceChecked==index}">
                  {{item.start}}—{{item.end}}</a></dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList" :key=item.id>
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.productImage" alt="" :key="item.productId"></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="add(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40" v-show="scroll" class="loadmore">loading...
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modalss :mdShow='mdShow' @close="closeModal">
        <p slot="message">
          请先登录，否则无法加入购物车
        </p>
        <div slot='btnGroup'>
          <a href="javascript:;" @click="mdShow=false" class="btn btn--m">关闭</a>
        </div>
      </modalss>
       <modalss :mdShow='mdShowSuc' @close="closeModal">
        <p slot="message">
          加入购物车成功！
        </p>
        <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowSuc=false">继续购物</a>
        <router-link to='/cart' class="btn btn--m">查看购物车</router-link>
        </div>
      </modalss>
      <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
        <footer1></footer1>
    </div>
</template>

<script>
import navBread from './navBread'
import modalss from './modal'

    export default{
        data(){
            return {
           goodsList:[],
           priceFilter:[
             {
               start:'0.00',
               end:'100.00'
             },
             {
               start:'100.00',
               end:'500.00'
             },
             {
               start:'500.00',
               end:'1000.00'
             },
             {
               start:'1000.00',
               end:'2000.00'
             }
           ],
           priceChecked:'all',
           overlayFlag:false,
           Filter:false,
           page:1,
           pageSize:8,
           sortFlag:true,
           jiantou:'↑',
           busy:true,
           scroll:true,
           mdShow:false,
           mdShowSuc:false
            }
        },
        components:{
            navBread,
            modalss
        },
        mounted(){
        this.getGoods()
        },
        methods:{
          getAll(){
            this.priceChecked='all'
            this.page=1
            this.getGoods()

          },
          getGoods(flag){
            this.$axios.get('/goods/list',{
              params:{
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,
                priceLevel:this.priceChecked
              }
            })
            .then(res=>{
              if(flag){
             this.goodsList=this.goodsList.concat(res.data.result.list)
             this.busy=false
             if(res.data.result.count<8){
               this.busy=true
               this.scroll=false
             }
             }
             else{
               this.goodsList=res.data.result.list
               this.busy=false
             }
            })
          },
          showPrice(){
           this.overlayFlag=true,
           this.Filter=true
          },
          closePop(){
          this.overlayFlag=false,
           this.Filter=false
          },
          setPrice(index){
            this.priceChecked=index;
            this.overlayFlag=false
            this.Filter=false
            this.page=1
            this.getGoods()

          },
          sort(){
            this.sortFlag=!this.sortFlag
            this.page=1
            this.getGoods()
            if(this.jiantou=='↑'){
              this.jiantou='↓'
            }else{
              this.jiantou='↑'
            }
          },
          loadMore(){
            console.log(112344);
              this.busy=true
              setTimeout(()=>{
                 this.page++
                 this.getGoods(true)
              },500)
          },
          add(id){
            if(this.$store.state.nickName=='admin'){
              alert('管理员无法使用加入购物车功能')
              return
            }else if(this.$store.state.nickName==''){
             this.mdShow=true
              return
            }
            else{
            this.$axios.post('/goods/addcar',{
              productId:id
            })
            .then(res=>{
             if(res.data.status=='0'){
               this.mdShowSuc=true
             }
             else{
             this.mdShow=true
             }
            })
            }
          },
          closeModal(){
            this.mdShow=false
            this.mdShowSuc=false
          }
        }
    }
</script>
<style>
.container .filter-nav{
  margin-top:1px;
}
.nav {
    clear: both;
}
.loadmore {
  height: 100px;
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>

