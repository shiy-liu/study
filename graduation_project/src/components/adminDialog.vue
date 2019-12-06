<!-- 登录对话框 -->
<template>
<v-layout>
    <v-flex md6 offset-md6>
  <div class="dialog2">
      <div class="right2">
        <div class="sub-right">
              <p class="title1">管理员登录</p>
<v-layout>
    <v-flex md8 offset-md2>
         <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="account"
      label="账号"
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
     <v-btn round color="primary" dark block @click="login">确定</v-btn>
  </v-form>
 </v-flex>
 </v-layout>
</div>
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
      account: ''
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
        login(){
            this.$axios.post('/users/admin/login',{
                adminName:this.account,
                adminPwd:md5(this.password)
            })
            .then(res=>{
                if(res.data.status=='200'){
              this.$store.commit("upadteUserInfo",res.data.result.adminName)
             this.$emit('childEvent',true,res.data.msg,'success')
             this.$router.push('/admin')
                }
                else{
                  this.$emit('childEvent',true,res.data.msg,'adminerror')
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
    left: 30%;
   translate: (-50%,-50%);
    z-index: 20;
}

.dialog2 .right2 {
    width: 70%;
    height: 100%;
    background-color: #fff;
    border-radius: 5%;
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