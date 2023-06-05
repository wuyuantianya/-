/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 15:11:05
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 23:10:18
 * @FilePath: \frontend-node-master\blogDB\modules\Message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 评论
const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Comment = sequelize.define('Comment',
{
    nickname:{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    },
    content:{ // 评论内容
        type: DataTypes.STRING,
        allowNull:false
    },
    blogId:{ // 评论博客
        type: DataTypes.INTEGER,
        allowNull:false
    },
    avatar:{
        type: DataTypes.STRING,
    }
});

module.exports = Comment;