<!-- 服务 -->
<template>
  <div class="service">
    <div class="block">服务</div>
  <v-layout>
  <v-navigation-drawer
    stateless
    value="true"
  >
    <v-list>
      <v-list-group
        prepend-icon="face"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>云端服务</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list
          value="true"
          v-for="(item,index) in couldService" :key="index"
        >   
            <v-list-tile @click="selected(item.content)">
               <v-list-tile-action>
          <v-icon>build</v-icon>
        </v-list-tile-action>
              <v-list-tile-title >{{item.services}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
      </v-list-group>
   <v-list-group
        prepend-icon="face"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>外包服务</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list
          value="true"
          v-for="(item,index) in outService" :key="index"
        >   
            <v-list-tile @click="selected(item.content)">
               <v-list-tile-action>
          <v-icon>build</v-icon>
        </v-list-tile-action>
              <v-list-tile-title>{{item.services}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
      </v-list-group>
       <v-list-group
        prepend-icon="face"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>支援服务</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list
          value="true"
          v-for="(item,index) in supportService" :key="index"
        >   
            <v-list-tile @click="selected(item.content,item.services)">
               <v-list-tile-action>
          <v-icon>build</v-icon>
        </v-list-tile-action>
              <v-list-tile-title>{{item.services}}</v-list-tile-title>
            </v-list-tile>
        </v-list>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-flex md6>
    <service-content :content="selectedService" ref="cont"></service-content>
  </v-flex>
</v-layout>
  </div>
</template>

<script>
import serviceContent from './serviceContent'
  export default {
    data: () => ({
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ],
      service:[],
      couldService:[],
      outService:[],
      supportService:[],
      selectedService:[]
    }),
    mounted(){
      this.getList()
    },
    methods:{
       getList(){
      this.$axios.get('/services/info')
      .then(res=>{
        this.service=res.data.result
        this.service.forEach(item=>{
          if(item.type=='支援服务'){
            this.supportService.push(item)
          }else if(item.type=='外包服务'){
             this.outService.push(item)
          }else {
            this.couldService.push(item)
          }
        })
      })
    },
    selected(item,type){
      if(type=='档案下载'){
         this.$refs.cont.flag=true
          this.selectedService=item
      }
      else{
        this.$refs.cont.flag=false
      this.selectedService=item
      }

    }
    },
    components:{
      serviceContent
    }
  }
</script>
<style scoped>
.service {
    width: 100%
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