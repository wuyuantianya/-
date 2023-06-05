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
    <Editor height="600px"  :initialValue="formData.htmlContent" ref="toastuiEditor" />
    <div class="article-comment-style">文章描述</div>
    <el-input
      type="textarea"
      :rows="6"
      placeholder="请输入文章描述"
      v-model="formData.description"
    />
    <!-- 文章头图 -->
    <Upload title="文章头图" v-model="formData.thumb" />
    <!-- 文章分类 -->
    <div class="article-comment-style">文章分类</div>
    <el-select v-model="formData.order" placeholder="请选择文章分类">
      <el-option :label="item.name" :value="item.id" v-for="item in selectList" :key="item.id"></el-option>
    </el-select>
    <!-- 提交按钮 -->
    <div class="article-comment-style"></div>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/UploadImg";
import { getBlogTypes } from "@/api/blogType";
import { addBlog } from "@/api/blog";
export default {
  components: {
    Editor,
    Upload
  },
  data() {
    return {
      formData: {
        title: "",
        description:'',
        thumb:'',
        htmlContent:'',
        order:''
      },
      selectList:[]
    };
  },
  methods: {
    handleSubmit(){
        // 1.获取文章内容 2. 检查文章内容是否符合要求 3. 上传数据
        const markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
        const html = this.$refs.toastuiEditor.invoke('getHTML');
        if( html && this.formData.title && this.formData.description && this.formData.order){
            // 必要内容已填写完成,上传到服务器
            const obj = {
            ...this.formData,
            categoryId:this.formData.order,
            htmlContent:html,
            markdownContent:markdown,
            toc:[],
        }
        addBlog(obj).then(({data})=>{
            this.$message.success('提交成功')
            this.$router.push('/form/list')
        })
        } else{
            this.$message.error('请将内容填写完全')
            return
        }
    },
    fetchData(){
        const that = this
        getBlogTypes().then( res =>{
            that.selectList = res.data.rows
        })
    }
  },
  created() {
    this.fetchData()
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