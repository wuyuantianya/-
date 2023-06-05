/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 16:15:09
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 23:11:44
 * @FilePath: \frontend-node-master\blogDB\modules\sync.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
require('./Admin');
require('./Banner');
require('./Blog');
require('./Category');
require('./Message');
require('./Project');
require('./Static');
require('./Comment')
const sequelize = require('./db');
sequelize.sync({alter:true}).then(()=>{
    console.log('所有模型同步完成')
});