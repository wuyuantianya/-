
const express = require('express');
const router = express.Router();
const CommentService = require('../service/commentService')
const {handleAsync} = require('../middleware/handleAsync')
const adminService = require('../service/adminService')
const filterHelper = require('../utils/filterHelper')
// 分页获取评论
router.get('/',handleAsync(async (req,res,next)=>{
    const obj = filterHelper(req.query,'blogId','page','limit')
    const comments = await CommentService.getComments(obj)
    comments.rows.sort((a,b)=>new Date(b.dataValues.updatedAt).getTime() - new Date(a.dataValues.updatedAt).getTime())
    return {
        total:comments.count,
        rows:comments.rows
    }
}))
// 添加评论
router.post('/',handleAsync(async (req,res,next)=>{
    const body = req.body
    // 寻找登录者头像
    const admin = await adminService.findAdminById(req.session.token.id)
    body.avatar = admin.dataValues.avatar
    return await CommentService.addComment(body)
}))
// 删除评论
router.delete('/:id',handleAsync(async (req,res,next)=>{
    await CommentService.deleteComment(req.params.id)
    return true
}))
// 修改评论
router.put('/:id',handleAsync(async (req,res,next)=>{
    const obj = filterHelper(req.body,'nickname','content')
    await CommentService.updateComment(req.params.id,obj)
    return await CommentService.getCommentById(req.params.id)
}))

module.exports = router;