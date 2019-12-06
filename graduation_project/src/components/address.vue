<template>
<div>
 <nav-bread class="nav"> <span>收货地址</span></nav-bread>
        <div class="container">
          <div class="checkout-addr">
            <div class="page-title-normal">
              <h2 class="page-title-h2"><span>确认订单</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
              <ul>
                <li class="cur"><span>确认</span>配送地址</li>
                <li><span>核查</span>订单</li>
                <li><span>支</span> 付</li>
                <li><span>订单</span> 完成</li>
              </ul>
            </div>
            <!-- address list -->
            <div class="page-title-normal checkout-title">
              <h2><span>收货地址</span></h2>
            </div>
            <div class="addr-list-wrap">
              <div class="addr-list">
                <ul>
                  <li v-for="(item,index) in addressListFilter" :key=item.userName :class="{'check':ischecked==index}" @click="ischecked=index;seletedId=item.addressId">
                    <dl>
                      <dt>{{item.userName}}</dt>
                      <dd class="address">{{item.streetName}}</dd>
                      <dd class="tel">{{item.tel}}</dd>
                    </dl>
                    <div class="addr-opration addr-del">
                      <a href="javascript:;" class="addr-del-btn" @click="delAddressConfirm(item.addressId)">
                        删除
                      </a>
                    </div>
                    <div class="addr-opration addr-set-default">
                      <a href="javascript:;" class="addr-set-default-btn" v-if='!item.isDefault' @click="setDefault(item.addressId)">Set default</a>
                    </div>
                    <div class="addr-opration addr-default" v-if='item.isDefault'>默认地址</div>
                  </li>
                  <li class="addr-new" @click="addressModal=true">
                    <div class="add-new-inner">
                      <p>添加新地址</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="shipping-addr-more">
                <a class="addr-more-btn up-down-btn" href="javascript:;" @click="getMore">
                  更多
                </a>
              </div>
            </div>

            <!-- shipping method-->
            <div class="page-title-normal checkout-title">
              <h2><span>配送方式</span></h2>
            </div>
            <div class="shipping-method-wrap">
              <div class="shipping-method">
                <ul>
                  <li class="check">
                    <div class="name">标准配送</div>
                    <div class="price">免费</div>
                    <div class="shipping-tips">
                      <p>商品会在发货后的1-7个工作日送达</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="next-btn-wrap">
              <!-- <router-link class="btn btn--m btn--red" :to="{path:'orderConfirm',query:{'addressId':seletedId}}">下一步</router-link> -->
              <button class="btn btn--m btn--red" @click="gogo()">下一步</button>
            </div>
          </div>
        </div>
            <modalss :mdShow='mdShowDel' @close="closeModal">
  <p slot="message">
        确定删除吗？好不容易存的啊
    </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delAddress">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="mdShowDel=false">取消</a>
        </div>
    </modalss>
<!--添加地址弹框-->
<div class="modal" tabindex="-1" role="dialog" v-show="addressModal" style="display:block">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="addressModal=false"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新地址</h4>
      </div>
      <div class="modal-body">
          <form class="form-horizontal">
              <p v-show="tip">添加成功</p>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  placeholder="Name" v-model="userName">
    </div>
  </div>
    <div class="form-group">
   <label for="inputEmail3" class="col-sm-2 control-label">地址</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  placeholder="streetName" v-model="streetName">
    </div>
  </div>
    <div class="form-group">
   <label for="inputEmail3" class="col-sm-2 control-label">电话</label>
    <div class="col-sm-10">
      <input type="text" class="form-control"  placeholder="phone" v-model="tel">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">邮编</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" placeholder="post code" v-model="postCode">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="button" class="btn btn-block" @click="jiaAddress">添加</button>
    </div>
  </div>
</form>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>
</template>
<style>
.nav {
    clear: both;
}
</style>
<script>
import navBread from './navBread'
import modalss from './../components/modal'
  export default{
      data(){
          return{
              addressList:[],
              limit:3,
              ischecked:0,
              mdShowDel:false,
              addressId:'',
              seletedId:'',
              addressModal:false,
              userName:'',
              postCode:'',
              tel:'',
              streetName:'',
              tip:false
          }
      },
      computed:{
          addressListFilter(){
              return this.addressList.slice(0,this.limit)
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
        jiaAddress(){
           this.$axios.post('users/jiaAddress',{
                 userName:this.userName,
                 postCode:this.postCode,
                 tel:this.tel,
                 streetName:this.streetName
              })
              .then(res=>{
                  if(res.data.status=='0'){
                     this.init()
                     this.tip=true
                  }
              })
        },
        gogo(){
          if(this.seletedId==''){
            alert('请先选择收货地址！')
            return
          }
          else{
            this.$router.push({
          path: '/orderConfirm',
          query: {
            addressId: this.seletedId
          }
        })
          }
        },
          init(){
              this.$axios.get('users/addressList')
              .then(res=>{
                  this.addressList=res.data.result;
                  console.log(this.addressList);
              })
          },
          getMore(){
              if(this.limit==3){
                  this.limit=this.addressList.length
              }
              else{
                  this.limit=3
              }
          },
          setDefault(addressId){
              this.$axios.post('users/setDefault',{
                  addressId:addressId
              })
              .then(res=>{
                  if(res.data.status=='0'){
                     this.init()
                  }
              })
          },
          closeModal(){
              this.mdShowDel=false
              this.modalAddress=false
          },
          delAddressConfirm(id){
              this.mdShowDel=true
              this.addressId=id
          },
          delAddress(){
              this.$axios.post('users/delAddress',{
                  addressId:this.addressId
              })
              .then(res=>{
                  if(res.data.status=='0'){
                      this.mdShowDel=false
                      this.init()
                  }
              })
          }
      }
  }
</script>
