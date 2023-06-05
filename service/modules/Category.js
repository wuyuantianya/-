/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 15:11:58
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-01 16:02:49
 * @FilePath: \frontend-node-master\blogDB\modules\Captcha.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 分类
const { DataTypes } = require('sequelize')
const sequelize = require('./db');
const Category = sequelize.define('Category',
{
    name:{ // 分类名称
        type: DataTypes.STRING,
        allowNull:false
    },
});

module.exports = Category;