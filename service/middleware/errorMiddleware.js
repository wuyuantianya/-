/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-14 15:49:30
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-16 19:34:02
 * @FilePath: \frontend-node-master\blogDB\middleware\errorMiddleware.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 处理错误中间件
const { getErr } = require('../modules/sendResult')
module.exports = async function(err,req,res,next){
    if(err){
        const errMsg = err instanceof Error ? err.message : err
        res.status(500).send(getErr(errMsg))
    }else{
        next()
    }
}