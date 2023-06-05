<template>
  <div class="upload-img-container">
    <div class="block">{{title}}</div>
    <el-upload
      action="/api/upload"
      list-type="picture-card"
      :onSuccess="handleSuccess"
      :show-file-list="false"
      :onError='handleErr'
      :headers="headers"
      ref="upload"
      name="img"
    >
      <img
        v-if="value"
        :src="imageUrl"
        class="avatar"
      />
      <i
        class="el-icon-plus"
        v-if="!value"
      ></i>
    </el-upload>
  </div>
</template>
<script>
import { server_URL } from "@/api/url";
import { Message } from "element-ui";
export default {
  props: ["value", "title"],
  computed: {
    headers() {
      return {
        // 从本地获取token，存放到header
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
    imageUrl() {
      return `${server_URL}${this.value}`;
    },
  },
  methods: {
    handleSuccess(res) {
      // 文件状态改变时触发
      // 将事件交给父组件处理
      if (res.code === 200 && res.data) {
        // 说明上传成功，服务器给我们返回了图片上传后的服务器地址
        this.$emit("input", res.data);
      }
    },
    handleErr(error) {
      Message.error(
        JSON.parse(error.message).msg || "图片上传失败，请重新上传"
      );
    },
  },
};
</script>
<style>
.block {
  margin: 15px 0;
  font-weight: 100;
  font-size: 16px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>