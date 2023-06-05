/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-14 15:46:34
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-15 22:31:16
 * @FilePath: \frontend-node-master\blogDB\routes\adminRoute.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const AdminRouter = express.Router();
const { handleAsync } = require('../middleware/handleAsync');
const adminService = require('../service/adminService')

// 获取管理员列表
AdminRouter.get('/',handleAsync(async (req,res,next)=>{
    const admins = await adminService.findAllAdmins(req.body)
    return admins
}))

// 单个管理员
AdminRouter.get('/:id',handleAsync(async (req,res,next)=>{
    const obj = {
        ...req.params,
        ...req.query
    }
    const admin = await adminService.findAdmin(obj)
    return admin
}))

// 添加管理员
AdminRouter.post('/:id',handleAsync(async (req,res,next)=>{
    return await adminService.addAdmin(req.body,req.params.id)
}))


// 更新管理员信息
AdminRouter.put('/person/:id',handleAsync(async (req,res,next)=>{
    return await adminService.updateAdmin(req.params.id,req.body)
}))

module.exports = AdminRouter