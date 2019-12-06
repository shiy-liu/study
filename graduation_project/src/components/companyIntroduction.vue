<!-- 公司简介 -->
<template>
<div class="introduction">
  <div class="block">公司简介</div>
  <div v-for="(item,index) in introdution" :key="index" style="margin-bottom:20px">
  <v-layout column>
    <v-flex md12><p class="title">{{item.title}}</p></v-flex>
    <v-flex md12 >
      <p class="body" md-text-center v-for="(subItem,index) in item.body" :key="index">{{subItem}}</p>
    </v-flex>
  </v-layout>
  <v-divider/>
  </div>
  <v-layout>
    <v-flex md6>
      <img src="@/assets/companyPic.png" alt="">
    </v-flex>
  </v-layout>
</div>
</template>

<script>
export default {
  data () {
    return {
      introdution:[]
    };
  },
  mounted(){
  this.$axios.get('/companys/about/introduction')
  .then(res=>{
    this.introdution=res.data.result
  })
}
}

</script>
<style scoped>
.block {
    margin: 20px 0;
    width: 100%;
    padding-left: 15px;
    height: 24px;
    background-color:#aaa;
    color:#fff;
}
.body {
  color: #4A4A4A
}
</style>