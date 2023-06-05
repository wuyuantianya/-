/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-07 20:29:04
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-12 15:19:03
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    headers:{ 'Content-Type': 'application/json' },
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/whoami',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/api/loginout',
    method: 'post'
  })
}

export function updateInfo(id,data) {
  return request({
    url: `/api/admin/${id}`,
    method: 'put',
    data
  })
}

export function updatePwd(id,data) {
  console.log(id,11)
  return request({
    url: `/api/person/${id}`,
    method: 'put',
    data
  })
}

