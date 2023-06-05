// 数据库添加、删除、修改数据测试
const Admin = require('./service/adminService')
Admin.addAdmin({
    avatar:'',
    loginId:'谢',
    loginPwd:'123',
    title:'松英的松',
    githubUrl:'',
    githubName:'松英的英',
    qqNumber:'292334',
    qqQrcode:'',
    weixin:'ss',
    weixinQrcode:'{ 微信二维码',
    mail:'{ 邮箱',
    icp:'{ 网站备案号',
    favicon:'{ 网站图标',
    remember:'{ 免登录期限',
})
Admin.deleteAdmin(2)
Admin.updateAdmin(2,{
    avatar:'sjsjsjsjjsj',
    qqQrcode:'',
    weixin:'ss',
    weixinQrcode:'{ 微信二维码',
    mail:'{ 邮箱',
    icp:'{ 网站备案号',
    favicon:'{ 网站图标',
    remember:'{ 免登录期限',
})
const Banner = require('./service/bannerService')
Banner.addBanner({
    author:`{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    }`,
    midImg:`{ // 中图地址
        type: DataTypes.STRING,
        allowNull:false
    }`,
    bigImg:`{ // 大图地址
        type: DataTypes.STRING,
        allowNull:false
    }`,
    title:`{ // 标题
        type: DataTypes.STRING,
        allowNull:false
    }`,
    description:`{ // 描述
        type: DataTypes.STRING,
        allowNull:false
    }`,
})
Banner.deleteBanner(3)
Banner.updateBanner(1,{
    author:`we`
},1)
const Blog = require('./service/BlogService')
Blog.addBlog({
    author:`{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    }`,
    categoryId:`{ // 分类id
        type: DataTypes.STRING,
        allowNull:false
    }`,
    scanNumber:11,
    commentNumber:12,
    title:`{ // 标题
        type: DataTypes.STRING,
        allowNull:false
    }`,
    description:`{ // 描述
        type: DataTypes.STRING,
        allowNull:false
    }`,
    TOC:`{ // 目录
        type: DataTypes.STRING,
        allowNull:false
    }`,
    htmlContent:`{ // 正文
        type: DataTypes.STRING,
        allowNull:false
    }`,
    thumb:`{ // 缩略图
        type: DataTypes.STRING,
        allowNull:false
    }`,
})
Blog.deleteBlog(3)
Blog.updateBlog(1,{
    author:`we`
},1)
const Category = require('./service/CategoryService')
Category.addCategory({
    name:'vue'
})
Category.deleteCategory(3)
Category.updateCategory(1,{
    name:'js'
},1)
const Message = require('./service/messageSevice')
Message.addMessage({
    authorID:`{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    }`,
    content:`{ // 评论内容
        type: DataTypes.STRING,
        allowNull:false
    }`,
    blogID:`{ // 评论博客
        type: DataTypes.STRING,
        allowNull:false
    }`,
})
Message.deleteMessage(3)
Message.updateMessage(1,{
    authorID:`we`
},1)
const Project = require('./service/projectService')
Project.addProject({
    author:`{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    }`,
    name:`{ // 项目名称
        type: DataTypes.STRING,
        allowNull:false
    }`,
    url:`{ // 项目效果展现地址
        type: DataTypes.STRING,
        allowNull:false
    }`,
    githubUrl:`{ // github地址
        type: DataTypes.STRING,
        allowNull:false
    }`,
    thumb:`{ // 缩略图
        type: DataTypes.STRING,
        allowNull:false
    }`,
    order:`{ // 序号
        type: DataTypes.STRING,
        allowNull:false
    }`,
    description:`{ // 描述
        type: DataTypes.STRING,
        allowNull:false
    }`,
})
Project.deleteProject(1)
Project.updateProject(1,{
    name:'aaaa'
},1)
const Static = require('./service/staticService')
Static.addStatic({
    url:'aaa'
})
Static.deleteStatic(2)
Static.updateStatic(1,{
    name:'asssssjshdksdlkha,.aa'
},1)