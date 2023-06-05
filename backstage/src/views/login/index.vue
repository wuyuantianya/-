<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">个人博客管理后台</h3>
      </div>

      <!-- 用户名 -->
      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.loginId"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <!-- 用户密码 -->
      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 验证码 -->
      <div class="captcha-container ">
        <el-form-item class="captcha-input" prop="captcha">
          <span class="svg-container">
            <svg-icon icon-class="table" style="width: 15px;"></svg-icon>
          </span>
          <el-input
          ref="captcha"
          name="captcha"
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
          auto-complete="on"
          />
        </el-form-item>
        
        <div
        class="captcha-img"
        v-html="svg"
        @click="getCaptchaFun"
        >
        </div>
      </div>

      <!-- 七天免登录 -->
      <div class="checked">
        <el-checkbox v-model="loginForm.checked">七天免登录</el-checkbox>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  // 用户名称的有效度检验
import { validUsername } from '@/utils/validate'
import { getCaptcha } from '@/api/getCaptcha'
export default {
  name: 'Login',
  data() {
    // 用户名验证
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请填写正确的账号'))
      } else {
        callback()
      }
    }
    // 密码验证
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('至少输入六位密码'))
      } else {
        callback()
      }
    }
    // 验证码验证
    const validateCaptcha = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入验证码'))
      }else{
        callback()
      }
    }
    return {
      loginForm: {
        loginId: 'admin1',
        loginPwd: '123123',
        captcha:'',
        checked:true,
        remember:1
      },
      loginRules: {
        loginId: [{ required: true, trigger: 'blur', validator: validateUsername }],
        loginPwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
      },
      loading: false,
      passwordType: 'password',
      redirect: '/',
      svg:'',
    }
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     console.log(route)
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  methods: {
    // 控制密码显示与否
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
     this.$refs.loginForm.validate(async valid => {
       if(valid){
        // 验证通过
        // 将数据发送给服务器
        this.loading = true
        this.loginForm.remember = this.loginForm.checked ? 7 : 1
        try {
          await this.$store.dispatch('user/login',this.loginForm)
          // 登录成功
         this.$router.push({ path: this.redirect || '/' })
        } catch{
          this.loginForm.captcha = ''
          this.getCaptchaFun()
        } finally{
          this.loading = false
        }
       }
       // if(valid){
       //   // 表单验证通过
       //   this.loading = true
       //   if(this.loginForm.checked){
       //     this.loginForm.remember = 7
       //   }
       //   this.$router.push({ path: this.redirect || '/' })
       //   this.loading = false
       //   // this.$store.dispatch('user/login', this.loginForm).then(() => {
       //   //   this.$router.push({ path: this.redirect || '/' })
       //   //   this.loading = false
       //   // }).catch(() => {
       //   //   this.loading = false
       //   //   this.getCaptchaFun()
       //   //   this.loginForm.captcha = ''
       //   // })
       // }else{
       //   // 表单验证不通过
       // }
       // if (valid) {
       //   this.loading = true
       //   this.$router.push({ path: this.redirect || '/' })
       //   this.$store.dispatch('user/login', this.loginForm).then(() => {
       //     this.$router.push({ path: this.redirect || '/' })
       //     this.loading = false
       //   }).catch(() => {
       //     this.loading = false
       //   })
       // } else {
       //   console.log('error submit!!')
       //   return false
       // }
     })
    },
    async getCaptchaFun(){
      const res = await getCaptcha();
      this.svg = res
    }
  },
  created(){
    this.getCaptchaFun()
  }
}
</script>

<style lang="scss">


/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.captcha-container{
  border: none;
  display: flex;
}
.captcha-input{
  width: 70%;
}
.captcha-img{
  width: 150px;
  height: 50px;
  margin-left: 5px;
  /* background: red; */
}
.captcha-img img{
  width: 100%;
  height: 100%;
}
.checked{
  margin-bottom: 10px;
}
</style>
