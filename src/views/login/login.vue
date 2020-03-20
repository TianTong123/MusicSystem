<template>
  <div class="login">
    <div class="bg"></div>
    <span>TianTong音乐后台管理系统</span>
    <div class="wrap">
      <div class="login-title">登录</div>
      <div class="login-bg"></div>
      <el-form ref="loginForm" :rules="rules" :model="loginForm">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import downLoadFileFlow from "@/server/downLoadFile";
import util from "@/util/utils"
export default {
  data(){
    return {
      loginForm:{
        account: "",
        password: '',
      },
       rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ]
      }
    }
  },
  methods:{
    login(){
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$store.state.isFullLoading = true;
          this.$http.login({
            ...this.loginForm
          }).then(res => {
            if(res.data.code == 0){
              this.$myMsg.notify({
                content: '登录成功！',
                type: 'success'
              })
              let token = res.data.data.token
              //存储
              this.$store.state.token = token;
              util.saveSession("token", token);
              util.saveSession('user', res.data.data)
              this.$router.replace({name: 'home'})
            }else if(res.data.code == 1){
              this.$myMsg.notify({
                content: res.data.msg,
                type: 'error'
              })
            }
          }).catch(err => {
             this.$myMsg.notify({
              content: '未知错误',
              type: 'error'
            })
          })
          
        }
      });
    },
  }
}
</script>

<style scoped>
@import '../../../static/css/login.css';
</style>