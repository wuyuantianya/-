// 管理者
const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Admin = sequelize.define('Admin',
{
    loginId:{ // 管理员账号
        type: DataTypes.STRING,
        allowNull:false
    },
    loginPwd:{ // 管理员密码
        type: DataTypes.STRING,
        allowNull:false
    },
    avatar:{ // 头像
        type: DataTypes.STRING,
        allowNull:false
    },
    title:{ //网站标题
        type: DataTypes.STRING,
        allowNull:false
    },
    githubUrl:{ // github地址
        type: DataTypes.STRING,
        allowNull:false
    },
    githubName:{ // gitthub 名称
        type: DataTypes.STRING,
        allowNull:false
    },
    qqNumber:{ // qq号
        type: DataTypes.STRING,
        allowNull:false
    },
    qqQrcode:{ // qq二维码
        type: DataTypes.STRING,
        allowNull:false
    },
    weixin:{ // 微信号
        type: DataTypes.STRING,
        allowNull:false
    },
    weixinQrcode:{ // 微信二维码
        type: DataTypes.STRING,
        allowNull:false
    },
    mail:{ // 邮箱
        type: DataTypes.STRING,
        allowNull:false
    },
    icp:{ // 网站备案号
        type: DataTypes.STRING,
        allowNull:false
    },
    favicon:{ // 网站图标
        type: DataTypes.STRING,
        allowNull:false
    },
    remember:{ // 免登录期限
        type: DataTypes.INTEGER,
        allowNull:false
    },
},
{
    paranoid:true
})

module.exports = Admin;