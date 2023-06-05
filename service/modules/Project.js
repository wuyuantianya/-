/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 15:11:34
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-18 01:01:58
 * @FilePath: \blogDB\modules\Project.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 项目
const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Project = sequelize.define('Project',
{
    author:{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    },
    name:{ // 项目名称
        type: DataTypes.STRING,
        allowNull:false
    },
    url:{ // 项目效果展现地址
        type: DataTypes.STRING,
        allowNull:false
    },
    githubUrl:{ // github地址
        type: DataTypes.STRING,
        allowNull:false
    },
    thumb:{ // 缩略图
        type: DataTypes.STRING,
        allowNull:false
    },
    order:{ // 序号
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{ // 描述
        type: DataTypes.STRING,
        allowNull:false
    },
},
{
    paranoid:true
});

module.exports = Project;