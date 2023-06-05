<template>
    <div class="front-banner-container">
        <!-- 数据列表 -->
        <el-table :data="datas" style="width: 100%" border>
            <el-table-column label="序号" width="100" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="180" align="center" prop="title">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="description">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.description }}</span>
                </template>
            </el-table-column>
            <el-table-column label="中图预览" align="center" prop="midImg">
                <template slot-scope="scope">
                    <el-image :src="server_URL + scope.row.midImg" style="width:100px" fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="大图预览" align="center" prop="bigImg2">
                <template slot-scope="scope">
                    <el-image :src="server_URL + scope.row.bigImg" style="width:100px" fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="编辑" width="180" align="center" prop="edit">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
                        <el-button type="primary" icon="el-icon-edit" circle
                            @click="editBannerData(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column> 
        </el-table>
        <!-- 编辑信息弹出框 -->
        <el-dialog title="数据编辑" :visible.sync="dialogFormVisible">
            <el-form :model="editForm">
                <el-form-item label="标题">
                    <el-input v-model="editForm.title" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editForm.description" autocomplete="on"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <UploadImg title="中图图片" v-model="editForm.midImg" />
                    </el-col>
                    <el-col :span="12">
                        <UploadImg title="大图图片" v-model="editForm.bigImg" />
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancle">取 消</el-button>
                <el-button type="primary" @click="handleSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { bannerData, setBanner } from '@/api/bannerData'
    import { server_URL } from '@/api/url.js'
    import UploadImg from '@/components/UploadImg'
    export default {
        created() {
            this.getBannerData()
        },
        components: {
            UploadImg,
        },
        data() {
            return {
                datas: [],
                dialogFormVisible: false,
                editForm: {
                    midImg: '',
                    bigImg: '',
                    title: '',
                    description: ''
                },
                server_URL:server_URL
            }
        },
        methods: {
            // 获取首页标语数据
            getBannerData() {
                const that = this
                bannerData().then(res => {
                    that.datas = res.data.rows;
                })
            },
            // 编辑数据
            editBannerData(data) {
                this.dialogFormVisible = true
                this.editForm = { ...data }
            },
            // 编辑成功
            handleSuccess() {
                this.dialogFormVisible = false
                // 将修改的数据发送给服务器
                // 因为api要求，需要将三条数据全部发送给服务器，哪怕只修改了一条
                let arr = [...this.datas]
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === this.editForm.id) {
                        console.log(this.editForm)
                        arr[i] = this.editForm
                    }
                }
                this.datas = arr;
                const that = this;
                setBanner(arr).then(res=>{
                    // 上传数据成功
                    that.datas = res.data.rows
                    that.$message({
                        message:'上传成功',
                        type:'success'
                    })
                })
            },
            // 取消编辑
            handleCancle() {
                this.dialogFormVisible = false
                this.$alert('编辑内容不会自动保存，是否取消编辑', '', {
                    confirmButtonText: '确定',
                })
            },
        }
    }
</script>
<style>
    .front-banner-container {
        padding: 20px;
    }
</style>