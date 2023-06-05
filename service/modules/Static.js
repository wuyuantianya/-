// 静态资源
/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 15:09:19
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-01 16:14:59
 * @FilePath: \frontend-node-master\blogDB\modules\Banner.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 首页标语
const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Static = sequelize.define('Static',
{
    url:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Static;