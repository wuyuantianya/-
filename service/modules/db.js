/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 15:03:57
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-14 15:33:11
 * @FilePath: \frontend-node-master\blogDB\modules\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('blogdb', 'root', '200007', {
    host: 'localhost',
    dialect: 'mysql',
    logging:null
});
module.exports = sequelize;