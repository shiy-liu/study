<!-- 技术 -->
<template>
<div class="technology">
<div class="block">技术</div>
  <v-layout>
    <v-flex xs10 sm10 md4 v-for="item in tech" :key="item._id" style="margin-left:15px;">
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          :src="require('@/assets/technology.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{item.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span>{{item.overview}}...</span><br>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn  color="orange" @click="showDetial(item)">More...</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
<sub-technology ref="tech" :tech="selectedTech"></sub-technology>
</div>
</template>

<script>
import subTechnology from './subTechnology'
export default {
  data () {
    return {
      tech:[],
      selectedTech:{}
    };
  },
  mounted(){
    this.getList()
  },
  methods:{
    showDetial(item){
      this.selectedTech=item
      this.$refs.tech.show()
    },
    getList(){
      this.$axios.get('/technologys/info')
      .then(res=>{
        this.tech=res.data.result
        console.log(this.tech);
      })
    }
  },
  components:{
    subTechnology
  }
}

</script>
<style scoped>
.technology {
  position: relative;
}
.block {
    margin: 20px 0;
    width: 100%;
    padding-left: 15px;
    height: 24px;
    background-color:#aaa;
    color:#fff;
}
</style>