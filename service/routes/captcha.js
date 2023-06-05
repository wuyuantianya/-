/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-15 10:57:28
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-16 12:02:23
 * @FilePath: \blogDB\routes\captcha.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const svgCaptcha = require('svg-captcha');
const express = require('express');
const router = express.Router()

router.get('/res/captcha',async (req,res,next)=>{
    let options = {
        size: 4, // 4个字母
        noise: 3, // 干扰线2条
        color: true, // 文字颜色
        background: "#666", // 背景颜色
        ignoreChars: "iIl10oO",
        // 数字的时候，设置下面属性。最大，最小，加或者减
        // mathMin: 1,
        // mathMax: 30,
        // mathOperator: "+",
    }
    let {text,data} = svgCaptcha.create(options)
    // 将正确验证码保存到服务器
    req.session.captcha = text.toLowerCase();
    // 将验证码图片发送到服务器
    res.type('svg')
    res.send(data)
})

module.exports = router;