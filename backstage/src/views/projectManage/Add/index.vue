<template>
  <div class="add-project-container">
    <div class="comment">项目名称</div>
    <el-input
      v-model="formData.name"
      placeholder="请输入项目标题"
    ></el-input>
    <div class="comment">项目描述(项目特点用,分隔)</div>
    <el-input
      v-model="formData.description"
      placeholder="请输入项目描述"
    ></el-input>
    <div class="comment">项目链接</div>
    <el-input
      v-model="formData.url"
      placeholder="请输入项目链接"
    ></el-input>
    <div class="comment">github地址</div>
    <el-input
      v-model="formData.githubUrl"
      placeholder="请输入github地址"
    ></el-input>
    <!-- 预览图 -->
    <Upload
      title="预览图"
      v-model="formData.thumb"
    />
    <div class="comment">排列等级</div>
    <el-select
      v-model="formData.order"
      placeholder="请选择"
      class="input-with-select"
      ref="selector"
    >
      <el-option
        label="1"
        value="1"
      ></el-option>
      <el-option
        label="2"
        value="2"
      ></el-option>
      <el-option
        label="3"
        value="3"
      ></el-option>
      <el-option
        label="4"
        value="4"
      ></el-option>
      <el-option
        label="5"
        value="5"
      ></el-option>
    </el-select>
    <div
      slot="footer"
      class="dialog-footer comment"
    >
      <el-button
        type="primary"
        @click="hanldeConfirm"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import Upload from "@/components/UploadImg";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      formData: {
        name: "",
        description: "",
        url: "",
        githubUrl: "",
        thumb: "",
        order: "1",
      },
      select: "1",
    };
  },
  methods: {
    hanldeConfirm() {
      // 判断内容是否填写完全
      const { name, thumb, url, order, description, id } = this.formData;
      if (name && thumb && url && order && description) {
        // 填写完成，将数据提交给服务器
        addProject({
          ...this.formData,
          description: this.formData.description.split(","),
        })
          .then(() => {
            this.$message.success("提交成功");
            this.$router.push('/projectmanage/list')
          })
          .catch(() => {
            this.$message.error("提交失败，请重新提交");
          });
      } else {
        this.$message.error("请将内容填写完全");
      }
    },
  },
};
</script>

<style>
.add-project-container{
    margin: 20px;
}
.comment {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 100;
}
.input-with-select {
  width: 200px;
  margin:  0 ;
}
</style>