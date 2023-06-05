/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 15:09:57
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 19:21:37
 * @FilePath: \frontend-node-master\blogDB\modules\Blog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 博客文章
const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Blog = sequelize.define('Blog',
{
    author:{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    },
    categoryId:{ // 分类id
        type: DataTypes.INTEGER,
    },
    scanNumber:{ // 浏览次数
        type: DataTypes.INTEGER,
        allowNull:false
    },
    commentNumber:{ // 评论数
        type: DataTypes.INTEGER,
        allowNull:false
    },
    title:{ // 标题
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{ // 描述
        type: DataTypes.STRING,
        allowNull:false
    },
    TOC:{ // 目录
        type: DataTypes.TEXT,
        allowNull:false
    },
    htmlContent:{ // 正文
        type: DataTypes.TEXT,
        allowNull:false
    },
    thumb:{ // 缩略图
        type: DataTypes.STRING,
        allowNull:false
    },
},
{
    paranoid:true
});

module.exports = Blog;