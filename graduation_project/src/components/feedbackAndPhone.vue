<!-- 留言和电话 -->
<template>
<div class="feedback-phone-container">
<v-layout>
    <v-flex md2>
        <v-btn color="orange darken-2" dark @click="$router.go(-1)">
        <v-icon dark left>arrow_back</v-icon>返回
      </v-btn>
    </v-flex>
    <v-flex md8>
  <div class="text-xs-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          点我
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key=index
           @click="goPath(item.title)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
  </v-flex>
</v-layout>
<v-layout>
    <v-flex md12 class="header">
        <p class="title text-md-center">尊敬的客户</p>
        <p class="text-md-center">在这里你可以咨询产品、服务、外包等相关业务，我们都会一一解答！</p>
    </v-flex>
</v-layout>
<phone v-show="showPhone"></phone>
<feedback v-show="showFeedBack"></feedback>
<im v-show="showIM"></im>
</div>
</template>

<script>
import phone from './phone'
import feedback from './feedback'
import im from './IM'
  export default {
    data: () => ({
      items: [
        { title: '留言' },
        { title: '电话' },
        { title: '实时对话' }
      ],
      showPhone:false,
      showFeedBack:true,
      showIM:false
    }),
    methods:{
        goPath(path){
            if(path=='留言'){
                this.showFeedBack=true;
                this.showPhone=false;
                this.showIM=false;
            }
            if(path=='电话'){
                this.showFeedBack=false;
                this.showPhone=true;
                this.showIM=false;
            }
            if(path=='实时对话'){
                this.showFeedBack=false;
                this.showPhone=false;
                this.showIM=true;
            }
        }
    },
    components:{
        phone,
        feedback,
        im
    }
  }
</script>
<style scoped>
.feedback-phone-container {
    width: 70%;
    margin: 0 auto;
}
.header {
    height: 200px;
    background-color: #2386C9;
    padding: 75px;
    color: #fff;
    margin-bottom: 20px;
}
</style>