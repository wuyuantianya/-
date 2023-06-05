/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-15 19:11:12
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-16 11:59:48
 * @FilePath: \blogDB\middleware\jwt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const cookieKey = 'token';
const secretKey = 'my learn';
const jwt = require('jsonwebtoken');

// 颁发jwt
exports.publish = function(res,maxAge = 3600 * 24,info = {}){
    const token = jwt.sign(info,secretKey,{
        expiresIn:maxAge * 1000
    })
    // 将token添加到cookie
    res.cookie(cookieKey, token, {
        maxAge: maxAge * 1000
    })
    // 将token添加到authorization
    res.header("authorization", "Bearer " + token)
    return token
}

// 解析jwt
exports.verify = async function(req){
    // 寻找token
    let token = req.cookies[cookieKey]
    // 判断是否有cookie中token
    if(!token){
        // 从响应头的authorization寻找
        token = req.headers['authorization']
        if(!token){
            // 响应头因为没有token
            return null
        }
        // 对是否存在bearer拆解
        token = token.split(' ')
        token = token.length === 1 ? token[0] : token[1]
    }
    try{
        const res = jwt.verify(token,secretKey)
        return res
    } catch{
        return null
    }
}