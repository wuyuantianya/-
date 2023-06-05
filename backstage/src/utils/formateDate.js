/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-28 20:39:28
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2022-12-28 21:03:36
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\utils\formatDate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 将时间戳转换成对应时间 如：2022-10-12 12：21：34
export default function(time){
    let date = new Date(time)
    return `${date.getFullYear()}-${sup(date.getMonth() + 1)}-${sup(date.getDate())}  ${sup(date.getHours())}:${sup(date.getMinutes())}:${sup(date.getSeconds())}`
}

// 不足两位 补足两位
function sup(n){
    const num = Math.abs(n);
    return num > 10 ? num : '0' + num
}