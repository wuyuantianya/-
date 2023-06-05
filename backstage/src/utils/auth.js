/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-07 20:29:04
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-12 14:42:00
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\utils\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie'

const TokenKey = 'admin_blog'

export function getToken() {
  let token = '';
  // 从cookie中获取token
  if(Cookies.get(TokenKey)){
    return Cookies.get(TokenKey)
  } else {
    token = localStorage.getItem('adminToken')
    return token
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem('adminToken')
  return Cookies.remove(TokenKey)
}
