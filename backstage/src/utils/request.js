/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2022-12-07 20:29:04
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2022-12-28 15:27:10
 * @FilePath: \09. vue组件库从入门到实战\mysite\background-system\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 发送请求前，将token携带过去
    const token = localStorage.getItem('adminToken');
    if(token){
      config.headers['authorization'] = "Bearer " + token
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if(response.headers.authorization){
      const token = response.headers.authorization.split(' ')[1];
      // 响应头里面如果有这个字段，我们需要将这个字段存储到 localstorage，之后的请求都需要将这个 token 带到服务器
      // 这一步很重要，一定要将 token 存储到本地
      localStorage.adminToken = token;
      response.data.token = token
    }
    return response.data // 响应放行

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    // 打印错误消息，获取错误消息响应的数据：error.response.data
    // console.log('err' + error.response.data.msg) // for debug
    Message({
      message: error.response.data.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
