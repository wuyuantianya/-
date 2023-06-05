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
      v-if="formData.length"
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
        label="头像"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px; background: #fff"
            :src="scope.row.avatar"
            fit="fill"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
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
import { deleteMessage, getMessages } from "@/api/message.js";
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
      limit: 10, // 页容量
      pageSizes: [5, 10, 15, 20],
      server_URL,
      srcList: [],
    };
  },
  methods: {
    // 获取分页数据
    fetchData(page, limit) {
      getMessages(page, limit).then((res) => {
        this.formData = res.data.rows;
        this.srcList = res.data.rows.map((item) => item.thumb);
        this.total = res.data.total;
      });
    },
    // 点击删除按钮触发函数
    handleDelete(id) {
      const that = this;
      this.$confirm("此操作将永久删除该留言, 是否继续?", "删除该留言", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMessage(id)
            .then(() => {
              that.fetchData(1, this.limit);
              that.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
                this.$message.error(err.message || '删除失败')
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
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
  