<template>
  <div class="add-article-container">
    <!-- 文章标题 -->
    <div class="article-comment-style">文章标题</div>
    <el-input
      placeholder="请输入文章标题"
      v-model="formData.title"
      clearable
    >
    </el-input>
    <!-- 文章编辑 -->
    <div class="article-comment-style">文章编辑</div>
    <Editor
      height="600px"
      :initialValue="formData.htmlContent"
      ref="toastuiEditor"
      language="zh-CN"
    />
    <div class="article-comment-style">文章描述</div>
    <el-input
      type="textarea"
      :rows="6"
      placeholder="请输入文章描述"
      v-model="formData.description"
    />
    <!-- 文章头图 -->
    <Upload
      title="文章头图"
      v-model="formData.thumb"
    />
    <!-- 文章分类 -->
    <div class="article-comment-style">文章分类</div>
    <el-select
      v-model="formData.order"
      placeholder="请选择文章分类"
    >
      <el-option
        :label="item.name"
        :value="item.id"
        v-for="item in selectList"
        :key="item.id"
      ></el-option>
    </el-select>
    <!-- 确认修改 -->
    <div class="article-comment-style"></div>
    <el-button
      type="primary"
      @click="handleSubmit"
    >确定</el-button>
    <!-- 取消 -->
    <el-button @click="handleCancel">取消</el-button>
  </div>
</template>
  
<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn"
import {Editor} from "@toast-ui/vue-editor";
import Upload from "@/components/UploadImg";
import { getBlogTypes } from "@/api/blogType";
import { updateBlog, getBlog } from "@/api/blog";
export default {
  components: {
    Editor,
    Upload,
  },
  data() {
    return {
      formData: {
        title: "",
        description: "",
        thumb: "",
        htmlContent: "",
        order: "", 
      },
      selectList: [],
      id: "",
      options: {
        language: 'zh-CN',
        toolbarItems: [
          ["ss", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          ["scrollSync"],
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      // 1.获取文章内容 2. 检查文章内容是否符合要求 3. 上传数据
      const markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      const html = this.$refs.toastuiEditor.invoke("getHTML");
      if (
        html &&
        this.formData.title &&
        this.formData.description &&
        this.formData.order
      ) {
        // 必要内容已填写完成,上传到服务器
        const obj = {
          ...this.formData,
          categoryId: this.formData.order,
          htmlContent: html,
          markdownContent: markdown,
          toc: [],
        };
        updateBlog(this.id, obj).then(({ data }) => {
          this.$message.success("修改成功");
          this.$router.push("/form/list");
        });
      } else {
        this.$message.error("请将内容填写完全");
        return;
      }
    },
    fetchData() {
      const that = this;
      getBlogTypes().then((res) => {
        that.selectList = res.data.rows;
      });
      this.id &&
        getBlog(this.id).then(({ data }) => {
          this.formData = { ...data, order: data.categoryId };
          this.$refs.toastuiEditor.invoke(
            "setHTML",
            data.htmlContent || "请开始你的创作之旅"
          );
        });
    },
    handleCancel() {
      this.$router.push("/form/list");
    },
  },
  created() {
    this.id = this.$router.currentRoute.params.id;
    this.fetchData();
  },
};
</script>
  
  <style>
.add-article-container {
  margin: 20px;
}
.article-comment-style {
  margin: 15px 0;
  font-weight: 100;
  font-size: 16px;
}
</style>