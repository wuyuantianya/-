const express = require('express');
const router = express.Router();
const { handleAsync } = require('../middleware/handleAsync');
const adminService = require('../service/adminService');
const jwt = require('../middleware/jwt');

router.post('/api/login',handleAsync(async (req,res,next)=>{
    // 验证验证码是否存在
    if(!(req.body.captcha && req.body.captcha === req.session.captcha)){
        req.session.captcha = ''
        throw Error('验证码错误')
    }
    req.session.captcha = ''
    // 判断token有效期
    let remember = req.body.remember ? req.body.remember : 1
    const result = await adminService.login(req.body)
    if(!result){
        throw Error('账号或者密码错误')
    }
    const token = await jwt.publish(res,3600*24 * remember,{
        id:result[0].dataValues.id,
        loginId:result[0].dataValues.loginId
    })
    req.session.token = token
    return result[0].dataValues
}))

router.get('/api/whoami',handleAsync(async (req,res,next)=>{
    // 验证验证码是否存在
    try{
        const userInfo = await adminService.whoami(req.session.token.id)
        return userInfo
    }catch {
        throw '用户不存在'
    }
}))

router.post('/api/loginout',handleAsync(async (req,res,next)=>{
    // 验证验证码是否存在
    res.cookie('token', '')
    // 将token添加到authorization
    res.header("authorization", "")
    req.session.token = ''
    return 19991
}))

router.put('/api/person/:id',handleAsync(async (req,res,next)=>{
    console.log(req.params.id)
    return await adminService.updateAdminPwd(req.body,req.params.id)
}))
module.exports = router
