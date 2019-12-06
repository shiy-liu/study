<!-- 留言客服 -->
<template>
  <div>
  <v-layout v-show="!nickName">
      <v-flex md6 offset-md3>
          <p class="text-md-center">
              请先登录您的邮箱！
          </p>
      </v-flex>
  </v-layout>
  <v-layout v-show="!nickName">
      <v-flex md6 offset-md3>
    <form>
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :counter="10"
      label="密码"
      required
      type="password"
    ></v-text-field>
    <v-flex class="text-md-center">
    <v-btn  color="orange darken-2" class="white--text" @click="login">登录</v-btn>
    </v-flex>
  </form>
      </v-flex>
  </v-layout>
  <v-layout v-show="nickName">
    <v-flex md6 offset-md3>
      <v-list three-line>
          <template v-for="item in commentList">
            <v-subheader
              v-if="item.userName"
              :key=item.Id
            >
              {{ item.userName }}
            </v-subheader>
            <v-list-tile
              :key=item.Id
              avatar
            >
              <v-list-tile-avatar>
                <img src="@/assets/avatar.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.messageText"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.time" ></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
                    <v-divider
              :key=item.Id
            ></v-divider>
          </template>
        </v-list>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex md6 offset-md5>
     <v-btn color="success" v-show="nickName" @click="more">More</v-btn>
    </v-flex>
  </v-layout>
  <v-layout>
      <v-flex md6 offset-md3>
          <p class="text-md-center">
              请写出您想对我们说的话
          </p>
      </v-flex>
  </v-layout>
  <v-layout>
       <v-flex md6 offset-md3>
        <v-textarea
          solo
          name="input-7-4"
          label="留言板"
          value=""
          v-model="commentText"
        ></v-textarea>
      </v-flex>
  </v-layout>
  <v-layout>
      <v-flex md4 offset-md2>
       <div class="text-xs-center">
          <v-chip># 添加附件</v-chip>
        </div>
    </v-flex>
  </v-layout>
  <v-layout>
      <v-flex md6 offset-md5>
          <v-btn  color="orange darken-2" class="white--text" @click="comment">发送</v-btn>
    </v-flex>
</v-layout>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :top="y === 'top'"
      :color="color"
    >
      {{ text }}
    </v-snackbar>
</div>
</template>

<script>
import md5 from 'js-md5';
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
        snackbar: false,
        y: 'top',
        x: null,
        timeout: 1500,
        text: '',
        color:'',
        commentList:[],
        commentText:'',
        i:3
    }),
    mounted(){
      this.checkLogin()     
    },
    computed:{
        nickName(){
            return this.$store.state.nickName
        }
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      login(){
            this.$axios.post('/users/login',{
                userEmail:this.email,
                userPwd:md5(this.password)
            })
            .then(res=>{
                if(res.data.status=='200'){
            this.$store.commit("upadteUserInfo",res.data.result.userName)
            this.snackbar=true
            this.color='success'
            this.text=res.data.msg

                }
                else{
              this.snackbar=true
              this.text=res.data.msg
              this.color='error'
                }
            })
        },
        getList(){
          this.$axios.get('/comments/messages')
        .then(res=>{
          if(res.data.status=='200'){
            this.commentList=res.data.result.reverse().splice(0,3)
          }
        })
        },
    checkLogin(){
    this.$axios.get('/users/checkLogin')
    .then(res=>{
      if(res.data.status=='200'){
      this.$store.commit("upadteUserInfo",res.data.result)
      }
  }).then(
     this.getList()
  )
},
more(){
  this.$axios.get('/comments/messages')
        .then(res=>{
          if(res.data.status=='200'){
            this.commentList=this.commentList.concat(res.data.result.reverse().splice(this.i,3))
           this.i=this.i+3
          }
        })
},
    comment(){
      if(this.commentText==''){
        this.snackbar=true
        this.color='warning'
        this.text="留言内容不能为空！"
        return
      }else if(this.$store.state.nickName==""){
        this.snackbar=true
        this.color='warning'
        this.text="请您先登陆账户！"
        return
      }else if(this.$store.state.nickName=="admin"){
        alert('请使用用户账号评论留言！')
        return
      }
      this.$axios.post('/comments/messages',{
        messageText:this.commentText
      })
      .then(res=>{
        this.getList()
        this.commentText=''
      })
    }
    }
  }
</script>
<style scoped>
</style>