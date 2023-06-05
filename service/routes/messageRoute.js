const express = require('express');
const router = express.Router();
const {handleAsync} = require('../middleware/handleAsync')
const MessageService = require('../service/messageService')
const adminService = require('../service/adminService')

// 获取所有评论
router.get('/',handleAsync(async (req,res,next)=>{
    const messages = await MessageService.getMessages(req.query)
    messages.rows.sort((a,b)=>new Date(b.dataValues.updatedAt).getTime() - new Date(a.dataValues.updatedAt).getTime())
    return {
        total:messages.count,
        rows:messages.rows
    }
}))
// 添加评论
router.post('/',handleAsync(async (req,res,next)=>{
    const body = req.body
    // 寻找登录者头像
    const admin = await adminService.findAdminById(req.session.token.id)
    body.avatar = admin.dataValues.avatar
    body.author = admin.dataValues.loginId
    return await MessageService.addMessage(body)
}))
// 删除评论
router.delete('/:id',handleAsync(async (req,res,next)=>{
    await MessageService.deleteMessage(req.params.id)
    return true
}))
// 修改评论
router.put('/:id',handleAsync(async (req,res,next)=>{
    await MessageService.updateMessage(req.params.id,req.body)
    return await MessageService.getMessageById(req.params.id)
}))

module.exports = router;