<!-- 注册对话框 -->
<template>
  <div class="dialog">
      <div class="left">
          <p class="title">欢迎回来！</p>
          <p>如果您已有账户，可以直接登录</p>
          <div class="login" @click="controlParent">登录</div>
      </div>
      <div class="right">
        <div class="sub-right">
              <p class="title1">创建账户</p>
<v-layout>
    <v-flex md8 offset-md2>
         <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="用户名"
      required
    ></v-text-field>

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
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="是否同意相关协议?"
      required
    ></v-checkbox>
     <v-btn round color="primary" dark block @click="register">确定</v-btn>
  </v-form>
 </v-flex>
 </v-layout>
</div>
      </div>
  </div>
</template>
<script>
import md5 from 'js-md5';
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      checkbox: false,
      password: '',
      passwordRules: [
        v => !!v || 'password is required',
        v => (v && v.length <= 10) || 'password must be less than 10 characters'
      ],
    }),

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
        controlParent(){
          this.$emit('childEvent',false)
      },
      register(){
            this.$axios.post('/users/reg',{
                userEmail:this.email,
                userPwd:md5(this.password),
                userName:this.name
            })
            .then(res=>{
                if(res.data.status=='200'){
            this.$emit('childEvent',true,res.data.msg,'success')
            this.$axios.post('/users/login',{
                userEmail:this.email,
                userPwd:md5(this.password)
            })
            .then(res=>{
                if(res.data.status=='200'){
              this.$store.commit("upadteUserInfo",res.data.result.userName)
                }
                else{
                  this.$emit('childEvent',true,res.data.msg,'error')
                }
              
            })

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
.dialog {
    position: fixed;
    width: 600px;
    height: 400px;
    top: 30%;
    left: 25%;
   translate: (-50%,-50%);
    z-index: 20;
}
.dialog .left {
    width: 30%;
    height: 100%;
    background-color: #2386C9;
    border-radius: 8% 0 0 8%;
    border: 1px solid #fff;
    border-right: none;
    color: #fff;
    vertical-align:middle;
    padding:5px

}
.dialog .right {
    width: 70%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 5% 5% 0;
    border: 1px solid #fff;
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