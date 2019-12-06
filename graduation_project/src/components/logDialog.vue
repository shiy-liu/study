<!-- 登录对话框 -->
<template>
<v-layout>
    <v-flex md6 offset-md6>
  <div class="dialog2">
      <div class="right2">
        <div class="sub-right">
              <p class="title1">我要登入</p>
<v-layout>
    <v-flex md8 offset-md2>
         <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="20"
      :rules="passwordRules"
      label="密码"
      required
      type='password'
    ></v-text-field>
    <a class="subheading" @click="admin"  >管理员登录</a>
     <v-btn round color="primary" dark block @click="login">确定</v-btn>
  </v-form>
 </v-flex>
 </v-layout>
</div>
 </div>
  <div class="left2">
          <p class="title">加入我们！</p>
          <p>如果您还没有账户，可以立即免费注册。</p>
          <div class="login" @click="controlParent">注册</div>
      </div>
  </div>
</v-flex>
</v-layout>
</template>
<script>
import md5 from 'js-md5';
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || '请填写您的密码',
        v => (v && v.length <= 10) || '密码必须大于10个字符'
      ],
      email: '',
      emailRules: [
        v => !!v || '请填写您的Email地址',
        v => /.+@.+/.test(v) || '无效的Email地址'
      ]
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      controlParent(){
          this.$emit('childEvent',false)
      },
      admin(){
         this.$emit('childEvent','admin')
      },
        login(){
            this.$axios.post('/users/login',{
                userEmail:this.email,
                userPwd:md5(this.password)
            })
            .then(res=>{
                if(res.data.status=='200'){
              this.$store.commit("upadteUserInfo",res.data.result.userName)
             this.$emit('childEvent',true,res.data.msg,'success')
                }
                else{
                  this.$emit('childEvent',true,res.data.msg,'error')
                }
              
            })
        }
    }
  }
</script>
<style scoped>
.dialog2 {
    position: fixed;
    width: 600px;
    height: 400px;
    top: 30%;
    left: 25%;
   translate: (-50%,-50%);
    z-index: 20;
}
.dialog2 .left2 {
    width: 30%;
    height: 100%;
    background-color: #2386C9;
    border-radius: 0 8% 8% 0;
    border: 1px solid #fff;
    border-right: none;
    color: #fff;
    vertical-align:middle;
    float: left;
    padding: 5px;

}
.dialog2 .right2 {
    width: 70%;
    height: 100%;
    background-color: #fff;
    border-radius: 5% 0 0 5%;
    border: 1px solid #fff;
      float: left;
}
.login {
  width:120px;
  height:30px;
  border: 1px solid #fff;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  cursor: pointer;
}
.title {
    margin: 100px 0 50px 40px;
}
.title1 {
     margin: 20px 0 20px 170px;
}
</style>