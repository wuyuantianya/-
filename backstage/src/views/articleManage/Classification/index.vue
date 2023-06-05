<template>
  <div class="classification-container">
    <div>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-select
          v-model="select"
          slot="prepend"
          placeholder="请选择"
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
          <el-option
            label="6"
            value="6"
          ></el-option>
        </el-select>

      </el-input>
      <el-button
        type="primary"
        @click="handleAdd"
      >添加</el-button>
    </div>
    <!-- 分类列表 -->
    <el-table
      :data="blogTypeList"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="博客类别"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="articleCount"
        label="文章数量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
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
              @click="handleEdit(scope.row)"
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

    <!-- 编辑弹窗 -->
    <el-dialog
      title="分类编辑"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
      <el-form :model="editForm">
        <el-form-item
          label="分类"
          label-width="100"
        >
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="文章等级"
          label-width="100"
        >
          <el-select
            v-model="editForm.order"
            placeholder="请选择等级"
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
            <el-option
              label="6"
              value="6"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancelEdit">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirmEdit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogTypes,
  updateBlogType,
  addBlogType,
  deleteBlogType,
} from "@/api/blogType";
export default {
  data() {
    return {
      blogTypeList: [],
      select: "1",
      input: "",
      dialogFormVisible: false,
      editForm: {
        name: "",
        order: "",
      },
    };
  },
  methods: {
    async fetchData() {
      const { data } = await getBlogTypes();
      this.blogTypeList = data.rows;
    },
    // 编辑按钮
    handleEdit(info) {
      this.editForm = { ...info };
      this.dialogFormVisible = true;
    },
    // 取消编辑
    handleCancelEdit() {
      this.dialogFormVisible = false;
    },
    // 确认编辑内容
    handleConfirmEdit() {
      // 判断内容是否为空
      if (!this.editForm.name) {
        this.$message.error("文章类型不能为空");
        return;
      } else {
        updateBlogType(this.editForm.id, this.editForm)
          .then(() => {
            this.$message.success("编辑成功");
            this.fetchData();
          })
          .catch(() => {
            this.$message.error("编辑失败");
          });
        this.dialogFormVisible = false;
      }
    },
    // 删除按钮
    handleDelete(id) {
      const that = this
      this.$confirm('此操作将永久删除该文章分类，归属该分类的文章将设置为未分类状态, 是否继续?', '删除该文章', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteBlogType(id).then(()=>{
                that.fetchData()
                that.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(err =>{
              that.$message({
                    type: 'error',
                    message: '删除失败'
                });
            })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 添加分类
    handleAdd() {
      if(!this.input){
        this.$message.error('请输入分类名称')
        return
      }
      addBlogType({
        name:this.input,
        order:this.select
      }).then(()=>{
        this.$message.success('添加成功');
        this.fetchData()
      }).catch(()=>{
        this.$message.error('添加失败')
      })
      this.input = ''
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.classification-container {
  padding: 20px;
}
.input-with-select {
  width: 400px;
  margin: 50px 10px 30px 0px;
}
</style>