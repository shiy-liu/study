<!-- 企业文化 -->
<template>
  <div class="culture">
    <p class="title text-md-center text-sm-center" style="margin-left:220px;">北京百星电子系统有限公司</p>
    <p class="title text-md-center text-sm-center" style="margin:0 0 40px 220px;">企业文化</p>
<v-layout>
  <v-flex md7>
      <v-tabs fixed-tabs>
    <v-tab
      v-for="(item,index) in culture"
      :key="index"
      @click="get(item)"
    >
      {{item.title}}
    </v-tab>
    <v-tabs-items>
      <v-tab-item
        v-for="(item,index) in culture" :key="index">
      <div v-for="(item2,index) in item.body" class="container" :key="index">
        <p class="my-title">{{item2.title}}</p>
        <p class="my-sub-title">{{item2.subTitle}}</p>
        <p class="my-content">{{item2.content}}
        </p>
        <img src="@/assets/workplace.png" alt="" v-show="item2.title=='最为舒适优美办公环境'" width="80%" height="80%">
      </div>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
  </v-flex>
  <v-flex md3 offset-md1>
     <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="@/assets/idea.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="@/assets/company.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="@/assets/environment.png" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
    </div>
  </v-flex>
</v-layout>
</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  data () {
    return {
        culture:[]
    };
  },
mounted(){
    var mySwiper = new Swiper('.swiper-container', {    
    pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 4000
    })
 this.$axios.get('/companys/about/culture')
      .then(res=>{
        this.culture=res.data.result
      })
},
methods:{
  get(a){
    console.log(a);
  }
}
}

</script>
<style scoped>
.culture {
  padding: 40px 0;
  width:70%;
}
.swiper-container {
    width: 550px;
    height: 450px;
}
.container {
  padding: 10px 10px 10px 50px;
}
.my-title {
  font-size: 14px;
  font-weight: 900;
}
.my-sub-title {
  font-size: 12px;
  font-weight: 500;
}
.my-content {
  color:#4A4A4A
}
</style>