/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-14 15:26:28
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-14 22:11:50
 * @FilePath: \frontend-node-master\blogDB\utils\filterHelper.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 过滤不需要的属性
module.exports = function(obj,...props){
    if( !obj || typeof obj !== 'object'){
        return
    }
    const newObj = {}
    for(const item in obj){
        if(props.includes(item)){
            newObj[item] = obj[item]
        }
    }
    return newObj;
}