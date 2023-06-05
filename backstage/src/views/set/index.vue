<template>
  <div class="add-project-container">
    <div class="comment">网站标题</div>
    <el-input
      v-model="formData.title"
      placeholder="请输入网站标题"
      :disabled="isDisabled"
    ></el-input>
    <div class="comment">邮箱</div>
    <el-input
      v-model="formData.mail"
      placeholder="请输入邮箱"
      :disabled="isDisabled"
    ></el-input>
    <div class="comment">备案号</div>
    <el-input
      v-model="formData.icp"
      placeholder="请输入网站备案号"
      :disabled="isDisabled"
    ></el-input>
    <div class="comment">github地址</div>
    <el-input
      v-model="formData.githubUrl"
      placeholder="请输入github地址"
      :disabled="isDisabled"
    ></el-input>
    <div class="comment">github名称</div>
    <el-input
      v-model="formData.githubName"
      placeholder="请输入github名称"
      :disabled="isDisabled"
    ></el-input>
    <div class="comment">网站图标地址</div>
    <el-input
      v-model="formData.favicon"
      placeholder="请输入网站图标地址"
      :disabled="isDisabled"
    ></el-input>
    <!-- 预览图 -->
    <Upload
      title="头像图片"
      v-model="formData.avatar"
    />
    <div class="comment"></div>
    <el-button
      type="primary"
      @click="hanldeConfirm"
    >{{editContent}}</el-button>
  </div>
</template>
  
<script>
import { getInfo } from "@/api/user";
import { updateInfo } from "@/api/user";
import Upload from "@/components/UploadImg";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      formData: {
        title: "",
        githubUrl: "",
        githubName: "",
        icp: "",
        mail: "",
        avatar: "",
        favicon: "",
      },
      isDisabled: true,
      editContent: "编辑",
    };
  },
  methods: {
    hanldeConfirm() {
      // 判断当前状态
      if (this.editContent === "编辑") {
        this.isDisabled = false;
        this.editContent = "完成";
      } else {
        // 判断内容是否填写完全
        const { title, icp, mail, favicon } = this.formData;
        if (title && icp && mail && favicon) {
          // 填写完成，将数据提交给服务器
          updateInfo(this.$store.getters.userInfo.id , this.formData)
            .then(() => {
              this.$store.dispatch('user/getInfo')
              this.editContent = "编辑";
              this.isDisabled = true;
              this.$message.success("修改成功");
            })
            .catch(() => {
              this.$message.error("提交失败，请重新提交");
            });
        } else {
          this.$message.error("请将内容填写完全");
        }
      }
    },
    fetchData() {
      this.formData = { ...this.$store.getters.userInfo }
      // getInfo().then(({data})=>{
      //   this.formData = { ...data }
      // })
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
  
  <style>
.add-project-container {
  margin: 20px;
}
.comment {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 100;
}
.input-with-select {
  width: 200px;
  margin: 0;
}
</style>