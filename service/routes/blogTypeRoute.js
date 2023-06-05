const express = require('express');
const router = express.Router();
const BlogTypeService = require('../service/BlogTypeService')
const blogService = require('../service/blogService')
const {handleAsync} = require('../middleware/handleAsync')

// 获取单个分类
router.get('/:id',handleAsync(async (req,res,next)=>{
    return await BlogTypeService.getBlogTypeById(req.params.id)
}))
// 获取所有分类
router.get('/',handleAsync(async ()=>{
    const data = await BlogTypeService.getBlogTypes()
    data.rows.sort((a,b)=> a.order - b.order)// 升序排列元素
    return {
        total:data.count,
        rows:data.rows
    }
}))
// 添加分类
router.post('/',handleAsync(async (req,res,next)=>{
    return await BlogTypeService.addBlogType(req.body)
}))
// 删除分类
router.delete('/:id',handleAsync(async (req,res,next)=>{
    if(req.params.id === '2'){
        throw '基础分类无法删除'
    }
    const data = await BlogTypeService.getBlogTypeById(req.params.id)
    const articleCount = data.articleCount
    // 删除时，应该查看分类下是否存在文章，如果有将其清空，但不删除文章
    if(articleCount === 0){
        // 没有文章，可以删除
        await BlogTypeService.deleteBlogType(req.params.id)
    } else {
        // 有文章，将其默认为未分类
        // 查询所有该id下的文章
        const res = await blogService.getBlogs({
            categoryId:req.params.id,
            page:1,
            limit:data.articleCount
        })
        // console.log(res,data.articleCount)
        // 将文章全部更新为分类id为1的分类下
        const blogtype = await BlogTypeService.getBlogTypeById(2)
        for (const key of res.rows) {
            key.categoryId = 2
            await key.save()
            blogtype.articleCount++;
            data.articleCount--
        }
        await blogtype.save()
        await data.save()
        await data.destroy()
    }
    return articleCount
}))
// 修改分类
router.put('/:id',handleAsync(async (req,res,next)=>{
    return await BlogTypeService.updateBlogType(req.body,req.params.id)
}))

module.exports = router;