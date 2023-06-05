const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Banner = sequelize.define('Banner',
{
    author:{ // 创建者
        type: DataTypes.STRING,
        allowNull:false
    },
    midImg:{ // 中图地址
        type: DataTypes.STRING,
        allowNull:false
    },
    bigImg:{ // 大图地址
        type: DataTypes.STRING,
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
},
{
    createdAt:true,
    updatedAt:true,
    paranoid:true
});

module.exports = Banner