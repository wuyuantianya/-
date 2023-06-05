<template>
    <div class="about-container">
        <div class="comment">关于我</div>
        <el-input v-model="input" :disabled="isDisable" />
        <div class="comment">
            <el-button @click="handleClick" type="primary">{{ editContent }}</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            input:'',
            editContent:'编辑',
            isDisable:true
        }
    },
    methods: {
        handleClick(){
            // 判断当前状态
            if(this.editContent === '编辑'){
                this.isDisable = false
                this.editContent = '完成'
            } else {
                // 点击完成，判断内容是否填写
                if(this.input){
                    this.editContent = '编辑'
                    this.isDisable = true
                    this.$message.success('修改成功')
                } else {
                    this.$message.error('内容不能为空')
                }
                
            }
        }
    },
}
</script>

<style>
.about-container{
    margin: 20px;
}
.comment{
    font-size: 16px;
    font-weight: 100;
    margin: 10px 0;
}
</style>