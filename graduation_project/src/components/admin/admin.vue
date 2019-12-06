<template>
  <v-card height="100%">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      absolute
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>超级管理员</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="go(item.name)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
  
      </v-list>
    </v-navigation-drawer>
    <div style="margin-left:300px;padding:20px">
      <router-view></router-view>
    </div>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: '用户管理', icon: 'people',name:'userAdmin' },
          // { title: '公司信息管理', icon: 'dashboard',name:'companyAdmin'},
          { title: '招聘信息管理', icon: 'face',name:'recruitAdmin' }, 
          { title: '订单管理', icon: 'question_answer',name:'orderAdmin' },
          { title: '留言管理', icon: 'feedback',name:'commentAdmin' },
          { title: '查看网站首页', icon: 'brightness_high',name:'home' },
          { title: '退出管理', icon: 'arrow_back',name:'logout' },
        ],
        right: null
      }
    },
    mounted(){
        this.checkLogin()
    },
    methods:{
        go(item){
            if(item=='home'){
                this.$router.push('/')
            }
            else if(item=='logout'){
             this.$axios.post('/users/admin/logout')
           .then(res=>{
               if(res.data.status=='200'){
            this.$store.commit("upadteUserInfo",res.data.result)
            this.$router.push('/')
               }
            })
            }else{
            this.$router.push(`/admin/${item}`)
            }
        },
         checkLogin(){
  this.$axios.get('/users/admin/checkLogin')
    .then(res=>{
      if(res.data.status=='200'){
      this.$store.commit("upadteUserInfo",res.data.result)
      }
  })
},
    }
  }
</script>