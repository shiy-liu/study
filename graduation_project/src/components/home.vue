<!-- 首页 -->
<template>
<div>
 <v-container class="home-container" fluid justify-center align-center>
   <v-layout class="top" :class="navBarFixed == true ? 'navBarWrap' :''">
     <v-flex md3 class="hidden-sm-and-down">
       <div class="logo"></div>
     </v-flex>
     <v-flex md6>
       <v-layout class="header">
      <v-flex md2> <router-link to="/" tag='span'>首页</router-link></v-flex>
      <v-flex md2> <router-link to="/technology" tag='span'>技术</router-link></v-flex>
      <v-flex md2> <router-link to="/service" tag='span'>服务</router-link></v-flex>
      <v-flex md2> <router-link to="/goodlist" tag='span'>产品</router-link></v-flex>
      <v-flex md2> <a href="https://aaron-lgf.github.io/belstarBlog/index.html" id="blog" target="_blank">博客</a></v-flex>
      </v-layout>
     </v-flex>
     <v-flex md3 v-show="!nickName">
       <v-layout class="action">
       <v-flex class="regesiter" @click="showRegDialog=true">注册</v-flex>
       <v-flex> <div class="login" @click="showLogDialog=true">登录</div></v-flex>
       </v-layout>
     </v-flex>
      <v-flex md2 v-show="nickName" offset-md2>
       <v-layout>
       <v-flex  style="height:10px">
        <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          {{nickName}},您好
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in menu"
          :key="index"
          @click="handleName(item)"
        >
          <v-list-tile-title>{{ item}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-flex>
       </v-layout>
     </v-flex>
   </v-layout>
   <router-view :info="info"></router-view>
   <promble></promble>
    <v-layout class="footer">
     <v-flex md2 offset-md2>
       <span class="title-bottom">关于百星</span>
       <ul class="bottom-click">
         <router-link to="/companyIntroduction" tag="li">公司简介</router-link>
         <router-link to="/companyHistory" tag="li">百星沿革</router-link>
         <router-link to="/companyCulture" tag="li">企业文化</router-link>
       </ul>
     </v-flex>
     <v-flex md3 offset-md1>
        <span class="title-bottom">联系我们</span>
       <ul>
        <li>客服：{{info.contactUs.customerService}}</li> 
        <li>总机：{{info.contactUs.centerCall}}</li> 
        <li>地址：{{info.contactUs.address}}</li>  
       </ul>
     </v-flex>
     <v-flex md5 offset-md2>
       <span class="title-bottom">加入我们</span>
       <ul class="bottom-click">
         <router-link to="/school" tag="li">校园招聘</router-link>
         <router-link to="/social" tag="li">社会招聘</router-link>
         <router-link to="/overseas" tag="li">海外招聘</router-link>
       </ul>
     </v-flex>
   </v-layout>
   <reg-dialog v-show="showRegDialog" @childEvent='changeRegDialog'></reg-dialog>
   <log-dialog v-show="showLogDialog" @childEvent='changeDialog'></log-dialog>
   <admin-dialog v-show="showAdminLogDialog"  @childEvent='changeDialog'></admin-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="y === 'top'"
      :color="color"
    >
      {{ text }}
    </v-snackbar>
 </v-container>
  <div class="drak" v-show="showLogDialog==true?true:showRegDialog==true?true:showAdminLogDialog==true?true:false" @click="showRegDialog=false;showLogDialog=false;showAdminLogDialog=false"></div>
 </div>
</template>
<script>
import promble from './promble.vue'
import subHome from './subHome.vue'
import regDialog from './regDialog.vue'
import logDialog from './logDialog.vue'
import adminDialog from './adminDialog.vue'
import { fail } from 'assert';
export default {
  data () {
    return {
      navBarFixed:false,
      showRegDialog:false,
      showLogDialog:false,
      showAdminLogDialog:false,
       snackbar: false,
        y: 'top',
        x: null,
        timeout: 1500,
        text: '',
        color:'',
        info:{
 
        }
    };
  },
  mounted () {
      // 事件监听滚动条
      window.addEventListener('scroll', this.watchScroll)
       this.checkLogin()
       this.getList()
    },
    computed:{
        nickName(){
            return this.$store.state.nickName
        },
         menu(){
           return this.nickName=="admin"?['管理员界面','退出登录']:['购物车','我的订单','退出登录']}
    },
 components:{
      promble,
      subHome,
      regDialog,
      logDialog,
      adminDialog
  },
  methods: {
      watchScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //  当滚动超过 50 时，实现吸顶效果
        if (scrollTop > 600) {
          this.navBarFixed = true
        } else {
          this.navBarFixed = false
        }
     },
     getList(){
       this.$axios.get('/companys/home')
       .then(res=>{
         this.info=res.data.result
       })
     },
     changeDialog(item,status,color){
       if(arguments[0]==true){
         this.snackbar=true
         this.text=arguments[1]
         this.color=arguments[2]
          this.color=='success'?this.showAdminLogDialog=false:this.showLogAdminDialog=true
           this.color=='adminerror'?this.showAdminLogDialog=true:this.showLogDialog=false
         this.color=='success'?this.showLogDialog=false:this.showLogDialog==false?this.showLogDialog=false:this.showLogDialog=true
       }else if(arguments[0]=='admin'){
          this.showAdminLogDialog=true
          this.showLogDialog=false
       }
       else{
      this.showLogDialog=false;
       this.showRegDialog=true;
       }

     },
     changeRegDialog(item,status,color){
       if(arguments[0]){
         this.snackbar=true
         this.text=arguments[1]
         this.color=arguments[2]
         this.color=='success'?this.showRegDialog=false:this.showRegDialog=true
       }
       else{
       this.showLogDialog=true;
       this.showRegDialog=false;
       }
     },
    checkLogin(){
    this.$axios.get('/users/checkLogin')
    .then(res=>{
      if(res.data.status=='200'){
      this.$store.commit("upadteUserInfo",res.data.result)
      }
  }),
  this.$axios.get('/users/admin/checkLogin')
    .then(res=>{
      if(res.data.status=='200'){
      this.$store.commit("upadteUserInfo",res.data.result)
      }
  })
},
        handleName(item){
          if(item=='退出登录'){
           this.$axios.post('/users/logout')
           .then(res=>{
               if(res.data.status=='200'){
            this.$store.commit("upadteUserInfo",res.data.result)
            this.$router.push('/')
               }
           })
            this.$axios.post('/users/admin/logout')
           .then(res=>{
               if(res.data.status=='200'){
            this.$store.commit("upadteUserInfo",res.data.result)
            this.$router.push('/')
               }
           })
          } else if(item=='购物车'){
            this.$router.push('/cart')
          }
          else if(item=='管理员界面'){
            this.$router.push('/admin')
          }
           else if(item=='我的订单'){
            this.$router.push('/order')
          }else {
            this.$router.push('/')
          }
        },
}

}

</script>
<style scoped>
.wrapper {
    background:url('../assets/headerImage.png') 20px center no-repeat;
   background-size:100% 600px;
    min-height: 100%;
   position: relative;
}
.home-container {
  width: 80%;
  margin: 0 auto;
  min-height: 100%;
}
.navBarWrap {
    position:fixed;
    top:0;
    z-index:10;
    width: 80%;
    background-color: #fff;
    height: 50px;
  }

.logo {
  background:url('../assets/logo.jpeg') left center no-repeat;
   background-size: 160px 30px;
  height: 30px;
}
.header span,#blog{
  font-weight: 600;
}
.header span:hover,.bottom-click li:hover,#blog:hover {
  color: orange;
  font-size:14px;
}
.header ,.action,.bottom-click li,#blog{
  margin-top: 10px;
  cursor: pointer;
}
.login {
  width:100px;
  height:20px;
  border: 1px solid orange;
  border-radius: 20px;
  text-align: center;
}
.img-text {
  position: absolute;
  left: 12%;
  top: 20%
}
.feature li{
  margin: 10%;
  list-style-image: url('../assets/listStyle.png');
  font-size:14px;
  color: gray;
}
.feature2 {
  margin: 0 0 100px 80px;
}
.feature2 img{
  width: 25px;
  height: 25px;
  vertical-align: middle
}
.feature2 div{
  margin-left: -5px;
}
.title-bottom {
  font-size: 14px;
  font-weight: 800;
}
.footer ul li {
  margin: 5px 0 5px -25px;
  color:gray;
}
.drak {
  position: fixed;
  top: 0;
  width: 2000px;
  height: 2000px;
  z-index: 19;
  background-color:rgba(0,0,0,.6);
}
#blog {
  color: black;
  text-decoration: none;
}
</style>