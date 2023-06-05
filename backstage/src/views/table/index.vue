<template>
  <div class="app-container">
    <el-form ref="form" :model="formData" label-width="100px" :rules="rules">
  <el-form-item label="用户名" prop="loginId">
    <el-input v-model="formData.loginId"></el-input>
  </el-form-item>
  <el-form-item label="旧密码" prop="oldPwd">
    <el-input v-model="formData.oldPwd"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="newPwd">
    <el-input v-model="formData.newPwd"></el-input>
  </el-form-item>
  <el-form-item label="确认新密码" prop="confirmNewPwd">
    <el-input v-model="formData.confirmNewPwd"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">修 改</el-button>
    <el-button type="error">取 消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { updatePwd } from '@/api/user'
export default {
  data(){
    const validatePwd = (rule, value, callback) => {
      if(value !== this.formData.newPwd ){
        callback('两次密码不一致，请重新输入')
      }else {
        callback()
      }
    }
    return {
      formData:{
        loginId:'',
        oldPwd:'',
        newPwd:'',
        confirmNewPwd:''
      },
      rules: {
        loginId: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmNewPwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePwd }
        ],
      }
    }
  },
  methods: {
    onSubmit(){
      this.$refs.form.validate(async valid => {
       if(valid){
        // 验证通过
        // 将数据发送给服务器
        updatePwd(this.$store.getters.userInfo.id,{
          loginId:this.formData.loginId,
          loginPwd:this.formData.oldPwd,
          newPwd:  this.formData.newPwd
        }).then((res)=>{
          // 修改完成，跳转首页
          this.$message.success('修改成功')
          this.$store.dispatch('user/logout').then(()=>{
            this.$router.push('/login')
          })
          
        })
       }
     })
    }
  },
}
</script>
