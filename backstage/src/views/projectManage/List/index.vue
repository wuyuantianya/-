<template>
  <div class="list-project-container">
    <!-- 项目列表 -->
    <el-table
      :data="projectData"
      style="width: 100%"
      border
    >
        <!-- 序号 -->
      <el-table-column
        label="序号"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <!-- 项目名称 -->
      <el-table-column
        label="项目名称"
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
              :src="scope.row.thumb"
              fit="fill"
              slot="content"
            ></el-image>
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 项目描述 -->
      <el-table-column
        label="项目描述"
        align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <!-- 预览图 -->
      <el-table-column
        label="预览图"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.thumb"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github地址"
            placement="top"
          >
            <el-button
              size="mini"
              icon="el-icon-pear"
              type="warning"
              @click="handleGithub(scope.row.githubUrl)"
              :hide-after="1500"
              circle
            ></el-button>
          </el-tooltip>
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
    <!-- 项目编辑 -->
    <el-dialog
      title="项目编辑"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
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
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="hanldeConfirm"
        >保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProject,
  getProjectList,
  updateProject,
  delProject,
} from "@/api/project";
import Upload from "@/components/UploadImg";
import { server_URL } from "@/api/url";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      projectData: [],
      dialogFormVisible: false,
      formData: {
        name: "",
        description: "",
        url: "",
        githubUrl: "",
        thumb: "",
        order: "",
        id:''
      },
    };
  },
  methods: {
    fetchData() {
      getProjectList().then(({ data }) => {
        this.projectData = data.rows.map(item=>{
            item.description = JSON.parse(item.description).join(',')
            item.thumb = server_URL + item.thumb
            return item
        });
      });
    },
    handleEdit(info) {
      this.dialogFormVisible = true;
      this.formData = { ...info }
    },
    handleDelete(id) {
      this.$confirm(
        "此操作将永久删除该项目包括项目的相关评论, 是否继续?",
        "删除项目",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delProject(id).then((res) => {
            // 删除成功，重新获取项目列表
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    hanldeConfirm() {
        // 判断内容是否填写完全
        const { name, thumb, url, order, description, id } = this.formData
        if(name && thumb && url && order && description){
            // 填写完成，将数据提交给服务器
            updateProject(id, {...this.formData, description:this.formData.description.split(',')}).then(({data})=>{
                this.dialogFormVisible = false
                this.$message.success('保存成功')
                this.fetchData()
            }).catch(()=>{
                this.$message.error('保存失败')
            })
        } else{
            this.$message.error('请将内容填写完全')
        }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.list-project-container {
  margin: 20px;
}
.comment {
  margin: 10px 0;
}
.input-with-select {
  width: 200px;
}
</style>