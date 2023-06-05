/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-16 17:22:15
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-16 20:08:54
 * @FilePath: \blogDB\routes\bannerRouter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const { handleAsync } = require('../middleware/handleAsync')
const bannerService = require('../service/bannerService')

// 获取首页标语
router.get('/',handleAsync(async (req,res,next)=>{
    const result = await bannerService.findAllBanner()
    return {
        total:result.count,
        rows:result.rows
    }
}))

// 修改首页标语
router.post('/',handleAsync(async (req,res,next)=>{
    return await bannerService.updateBanner(req.body)
}))

module.exports = router