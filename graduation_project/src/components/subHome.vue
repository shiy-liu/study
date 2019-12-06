<!-- 子首页 -->
<template v-slot:activator="{ on }">
  <v-app transition="slide-x-transition">
<div class="wrapper"></div>
<v-layout>
     <v-flex md12> <p class="text-md-center text-sm-center" id="mr">企业智能文件处理全流程服务平台</p></v-flex>
   </v-layout>
   <v-layout  class="feature2 fea" >
     <v-flex md2 v-for="(item,index) in info.feature" :key="index"><img :src='"@/assets/feature"+index+".png"' alt=""><div>{{item}}</div></v-flex>
   </v-layout>
   <div class="img-text">
    <div class="title">文件工程</div>
    <div class="title-english">Document Engineering</div>
    <ul class="feature">
      <li v-for="(item,index) in info.DocumentEngineering" :key="index">{{item}}</li>
    </ul>
   </div>
       <v-layout class="feature">
     <v-flex md12>
       <p class="text-md-center text-sm-center">我们的工作场景</p>
     </v-flex>
   </v-layout>
   <v-layout class="fea">
    <v-flex md10 offset-md1>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(item,index) in 6"
              :key="index"
              xs4
              d-flex
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="require('../assets/'+item+'.png')"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                </v-img>
              </v-card>
            </v-flex>
            <v-flex v-for="(item,index) in info.workingScene"
              :key="index"
              xs4
              d-flex>{{item}}</v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
<v-layout class="feature">
     <v-flex md12>
       <p class="text-md-center text-sm-center">数字化企业面临的问题</p>
     </v-flex>
   </v-layout>
  <v-layout class="fea" row wrap >
      <v-flex md3 class="trouble-list"  xs10 d-flex >
          <ul>
          <li v-for="(item,index) in promble1" :key="index">{{item}}</li>
          </ul>
      </v-flex>
        <v-flex md3 xs10 d-flex offset-xs1>
        <div class="trouble"></div>
      </v-flex>
      <v-flex md4 class="trouble-list"  xs10 d-flex offset-xs1>
          <ul>
            <li v-for="(item,index) in promble2" :key="index">{{item}}</li>
          </ul>
      </v-flex>
  </v-layout>
  <v-layout class="feature">
      <v-flex md12>
       <p class="text-md-center text-sm-center">我们的解决方案</p>
     </v-flex>
  </v-layout>
<div class="case">
  <v-layout>
          <v-flex md4 offset-md2 offset-xs2>
              <img src="@/assets/lingjianhua2.png" alt="" width="400" height="400">
          </v-flex>
        <v-flex md4 offset-md1 offset-xs2>
            <p class="title">{{info.solution[0].title}}</p>
            <p>{{info.solution[0].body}}</p>  
          </v-flex>
  </v-layout>
  <v-layout row wrap style="margin-top:20px">
          <v-flex md2 offset-md2 offset-xs2>
        <p class="title">{{info.solution[1].title}}</p>
            <p>{{info.solution[1].body}}</p> 
          </v-flex>
        <v-flex md4 offset-xs2>
            <img src="@/assets/anxushengchan.png" alt="" width="400" height="400">
          </v-flex>
  </v-layout>
</div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      promble1:[],
      promble2:[]
    };
  },
  props:["info"],
  mounted(){
    this.promble1=this.info.promble.slice(0,4)
    this.promble2=this.info.promble.slice(4,this.info.promble.length)
  }
}

</script>
<style scoped>
.wrapper {
    background:url('../assets/headerImage.png') 20px center no-repeat;
   background-size:100% 600px;
    height: 600px;
   position: relative;
}
.fea {
    margin-bottom:60px
}
.trouble {
    background: url(../assets/trouble.png) 18px center no-repeat;
    background-size: 220px 220px;
    width:220px;
    height: 220px;
    text-align: center
}
.trouble-list li{
    list-style: none;
    margin:10px
    }
.case {
    background: url(../assets/case-bg.png)  no-repeat;
    background-size: 100% 100%;
    width:100%;
    height: auto;
}
.img-text {
  position: absolute;
  left: 10%;
  top: 3%
}
.feature li{
  margin: 10%;
  list-style-image: url('../assets/listStyle.png');
  font-size:14px;
  color: gray;
}
.feature2 {
  margin: 0 0 60px 80px;
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
#mr {
    margin-top: 25px;
}
</style>