/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-15 18:58:52
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 14:07:16
 * @FilePath: \frontend-node-master\blogDB\middleware\tokenMiddleware.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('./jwt')
const pathToRegexp = require("path-to-regexp");
const needTokenApi = [
  { method: "GET", path: "/res/captcha"},
  { method: "POST", path: "/api/banner"},
  { method: "GET", path: "/api/banner"},
  { method: "GET", path: "/api/blog"},
  { method: "GET", path: /^\/api\/blog\/[^/]+$/},
  { method: "GET", path: "/api/blogtype"},
  { method: "GET", path: "/api/comment"},
  { method: "POST", path: "/api/comment"},
  { method: "GET", path: "/api/message"},
  { method: "GET", path: "/api/project"},
  { method: "GET", path: "/api/setting"},
];
module.exports = async function(req,res,next){
    // 排除不需要进行验证的路径
    const apis = needTokenApi.filter((api) => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
      });
      if (apis.length !== 0) {
        next();
        return;
      }
    const token = await jwt.verify(req)
    req.session.token = token
    if(!token){
        next('未登录或登录已过期，请重新登录')
    }
    next()
}

