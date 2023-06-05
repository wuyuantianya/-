const sequelize = require('./db');
const { DataTypes } = require('sequelize')
const BlogType = sequelize.define("BlogType",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    order:{
        type:DataTypes.STRING,
        allowNull:false
    },
    articleCount:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    createdAt:false,
    updatedAt:false
})

module.exports = BlogType;