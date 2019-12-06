<!--  -->
<template>
  <div>
<div class="block">海外招聘</div>
  <template>
     <v-alert
      :value="true"
      color="warning"
      icon="priority_high"
      outline
      v-show="overseas==''?true:false"
    >
      暂无海外招聘信息
    </v-alert>
  <v-layout row>
    <v-flex xs12 sm6  md4 v-for="(item,index) in overseas" :key="index" style="margin-left:20px">
      <v-card style="color:orange">
        <v-card-title primary-title>
          <div>
            <div class="title">{{item.recruitmentPosition}}</div>
            <span class="grey--text">{{item.workPlace}}</span>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="green" @click="dialog=true">立即申请</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show" style="color:black">
            <p class="my-title">岗位要求:</p>
            <p v-for="(subItem,index) in item.jobResponsibilities" :key="index">{{subItem}}</p>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>
 <v-dialog
      v-model="dialog"
      max-width="290"
    >
     <v-card>
        <v-card-title class="headline">想申请这个岗位?</v-card-title>

        <v-card-text>
         简历投递：belstar.hr@belstar.com.cn
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show:false,
      dialog:false,
      overseas:[]
    };
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      this.$axios.get('/recruitments/overseas')
      .then(res=>{
        this.overseas=res.data.result
      })
    }
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
</style>