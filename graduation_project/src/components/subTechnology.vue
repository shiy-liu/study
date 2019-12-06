<template>
<transition name="move">
  <div class="subtech" v-show="showTech">
       <v-btn color="orange darken-2" dark @click="close">
        <v-icon dark left>arrow_back</v-icon>返回</v-btn>
    <v-layout class="content">
         <v-flex md6>
<p class="title">{{tech.overview}}具有以下几个典型特点：</p> 
<ul v-for="(item,index) in tech.content" :key="index">
    <li>{{item}}</li>
</ul>
 </v-flex>
 <v-flex md6>
     <p>基本服务框架如下：</p>
<img :src="require(`@/assets/${tech.title}.jpg`)" alt="" width="500" height="350">
 </v-flex>
    </v-layout>
</div>
</transition>

</template>

<script>
export default {
  data () {
    return {
        showTech:false
    };
  },
  props:['tech'],
  methods: {
      show(){
          this.showTech=true
      },
      close(){
          this.showTech=false
      }
  }
}

</script>
<style  scoped>
.subtech{
    position :fixed;
    top :0;
    left: 10%;
    bottom: 48px;
    z-index :30;
    width: 80%;
    height: 500px;
    background-color :#fff;
}
.move-enter-active,.move-leave-active{
        transition: all 0.2s linear;
        transform: translate3d(0,0,0)
}
.move-enter,.move-leave-active{
        transform: translate3d(100%,0,0);
}
.back{
    position :absolute;
    top :10px;
    left: 0;
}
.icon-arrow_lift{
    display: block;
    padding :10px;
    font-size :20px;
    color :#000
}
.content {
    padding: 30px;
    color: #4a4a4a;
    font-size: 16px;
}
</style>