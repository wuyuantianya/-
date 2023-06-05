<!--
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-07 22:31:28
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2022-12-28 21:40:30
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\views\articleManage\List\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="list-container">
    <!-- 分页列表数据表格 -->
    <el-table
      :data="formData"
      style="width: 100%"
      border
    >
      <el-table-column
        label="序号"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + (currentPage - 1) * limit + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章名称"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            placement="top"
            effect="light"
          >
            <el-image
              style="width: 100px; height: 100px; background:#fff"
              :src="server_URL + scope.row.thumb"
              fit="fill"
              :preview-src-list="srcList"
              slot="content"
            ></el-image>
            <span>{{ scope.row.title }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="浏览数"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.scanNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论数"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.commentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属分类"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.BlogType.name || '未分类' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatDate(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="handleEdit(scope.row.id)"
              circle
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(scope.row.id)"
              :hide-after="1500"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next, total, ->, sizes"
        :page-sizes="pageSizes"
        :total="total"
        :page-size="limit"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getBlogs, delBlog } from "@/api/blog.js";
import formatDate from "@/utils/formateDate";
import { server_URL } from "@/api/url";
export default {
  created() {
    this.fetchData(this.currentPage, this.limit);
  },
  data() {
    return {
      formData: [], // 表格数据
      currentPage: 1, // 当前页数
      total: 0, //文章总数
      limit: 5, // 页容量
      pageSizes: [5, 10, 15, 20],
      server_URL,
      srcList:[]
    };
  },
  methods: {
    // 获取分页数据
    fetchData(page, limit) {
      getBlogs(page, limit).then((res) => {
        this.formData = res.data.rows;
        this.srcList = res.data.rows.map( item=> server_URL + item.thumb)
        this.total = res.data.total;
      });
    },
    // 编辑按钮触发函数
    handleEdit(id) {
      this.$router.push(`/form/edit/${id}`)
    },
    // 点击删除按钮触发函数
    handleDelete(id) {
        const that = this
        this.$confirm('此操作将永久删除该文章以及文章下面的评论, 是否继续?', '删除该文章', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delBlog(id).then(()=>{
                that.fetchData()
                that.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(err =>{
                console.log(err)
            })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 时间转化函数
    formatDate,
    // 页容量发生改变时
    handleSizeChange(e) {
      this.fetchData(this.currentPage, this.limit);
    },
    // 当前页码发生改变时
    handleCurrentChange(e) {
      this.currentPage = e;
      this.fetchData(this.currentPage, this.limit);
    },
    // 点击上一页时触发
    handlePrevClick() {
      this.currentPage = this.currentPage - 1;
    },
    // 点击下一页时触发
    handleNextClick() {
      this.currentPage = this.currentPage + 1;
    },
  },
};
</script>
<style>
.pagination-container {
  margin-top: 20px;
}
</style>
