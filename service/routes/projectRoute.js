/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-17 01:17:11
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-18 01:04:13
 * @FilePath: \blogDB\routes\blogTypeRoute.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const {handleAsync} = require('../middleware/handleAsync')
const projectService = require('../service/projectService')
const adminService = require('../service/adminService')

// 获取所有项目
router.get('/',handleAsync(async (req,res,next)=>{
    const projects = await projectService.getProjects(req.query)
    projects.rows.sort((a,b)=>a.order - b.order)
    return {
        total:projects.count,
        rows:projects.rows
    }
}))
// 添加项目
router.post('/',handleAsync(async (req,res,next)=>{
    const body = req.body
    // 寻找登录者头像
    const admin = await adminService.findAdminById(req.session.token.id)
    body.author = admin.dataValues.loginId
    body.description = JSON.stringify(body.description)
    return await projectService.addProject(body)
}))
// 删除评论
router.delete('/:id',handleAsync(async (req,res,next)=>{
    await projectService.deleteProject(req.params.id)
    return true
}))
// 修改评论
router.put('/:id',handleAsync(async (req,res,next)=>{
    const body = req.body
    if(body.description){
        body.description = JSON.stringify(body.description)
    }
    await projectService.updateProject(req.params.id,body)
    return await projectService.getProjectById(req.params.id)
}))

module.exports = router;