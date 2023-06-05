/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-17 01:17:11
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-18 00:24:08
 * @FilePath: \blogDB\routes\blogTypeRoute.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const blogService = require('../service/blogService')
const CommentService = require('../service/commentService')
// const adminService = require('../service/adminService')
const BlogTypeService = require('../service/BlogTypeService')
const {handleAsync} = require('../middleware/handleAsync')

// 获取单篇博客
router.get('/:id',handleAsync(async (req,res,next)=>{
    return await blogService.getBlogById(req.params.id)
}))
// 获取所有博客
router.get('/',handleAsync(async (req,res,next)=>{
    const data = await blogService.getBlogs(req.query)
    if(!data){
        return '无数据'
    }
    data.rows.sort((a,b)=> a.order - b.order)// 升序排列元素
    return {
        total:data.count,
        rows:data.rows
    }
}))
// 添加博客
router.post('/',handleAsync(async (req,res,next)=>{
    // 添加过程中需要给分类加上文章数量
    const category = await BlogTypeService.getBlogTypeById(req.body.categoryId)
    if(category){
        category.articleCount++;
        category.save()
    }else{
        throw Error('分类不存在，请选择其他分类')
    }
    const body = req.body
    body.author = req.session.token.loginId
    return await blogService.addBlog(body)
}))
// 删除博客
router.delete('/:id',handleAsync(async (req,res,next)=>{
    const id = req.params.id
    // 删除博客的同时应该将分类中的文章数量进行调整
    const article = await blogService.getBlogById(id)
    if(article.length === 0){
        throw Error('该文章不存在')
    }
    // 获取分类id
    const categoryId = article[0].dataValues.categoryId
    // 调整
    const category = await BlogTypeService.getBlogTypeById(categoryId)
    category.articleCount--
    await category.save()
    // 删除文章
    await blogService.deleteBlog(id)
    // 删除博客文章时删除所有对应评论
    await CommentService.deleteComments(id)
    return true
}))
// 修改博客
router.put('/:id',handleAsync(async (req,res,next)=>{
    // 首先获取原来的博客数据
    const oldData = await blogService.getBlogById(req.params.id)
    // 原来的分类减一，新增的＋1
    if(oldData){
        // 数据存在
        try{
            await blogService.updateBlog(req.body,req.params.id)
        }catch{
            next(new Error('分类选择错误，请重新选择'))
        }
        const newData = await blogService.getBlogById(req.params.id)
        const old = await BlogTypeService.getBlogTypeById(oldData.dataValues.categoryId)
        const newD = await BlogTypeService.getBlogTypeById(newData.dataValues.categoryId)
        if(old){
            old.articleCount--;
            old.save()
        }
        if(newD){
            newD.articleCount++
            newD.save()
        }
        return newData
    }else{
        return '文章不存在'
    }
}))

module.exports = router;