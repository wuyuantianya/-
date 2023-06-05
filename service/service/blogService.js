const Blog = require('../modules/Blog')
const BlogType = require('../modules/BlogType')
// 添加博客文章
exports.addBlog = async function(BlogObj){
    BlogObj = {
        ...BlogObj,
        scanNumber:0,
        commentNumber:0,
        TOC:'aa'
    }
    return await Blog.create(BlogObj)
}
// 删除博客文章
exports.deleteBlog = async function(BlogId){
    return await Blog.destroy({
        where:{
            id:BlogId
        }
    })
}
// 修改博客文章信息
exports.updateBlog = async function(BlogObj,BlogId){
    return await Blog.update(BlogObj,{
        where:{
            id:BlogId
        }
    })
    // 修改过程中需要将之前的分类id修改成当前的分类id
    // const blog = await getBlogById(BlogId)
    // console.log(blog.BlogType,444)
    // if (blog && blog.BlogType) {
    //     if(BlogObj.categoryId !== blog.BlogType.id ){
    //         // 修改了文章分类
    //         // 原先的分类文章数量减一，当前的加一
    //         const blogType = await BlogType.findByPk(BlogObj.categoryId)
    //         console.log(blogType.articleCount,blog.BlogType.articleCount)
    //         blogType.articleCount ++;
    //         blog.BlogType.articleCount --;
    //         console.log(blogType.articleCount,blog.BlogType.articleCount)
    //         await blogType.save()
    //         await blog.BlogType.save();
    //     }
    //     await blog.update(Blogobj)
    //     console.log(blog.dataValues,BlogObj)
    //     await blog.save()
    //     return blog
    // } else {
    //     throw '缺少文章分类'
    // }
}

// 获取单片博客
exports.getBlogById = async function(id){
    return await Blog.findOne({
        where:{
            id
        },
        include:[
            {
                model:BlogType,
                attributes:['id','name']
            }
        ]
    })
}

// 按分类获取所有博客，没有值是分页获取所有博客
exports.getBlogs = async function({categoryId = -1,page = 1,limit = 10}){
    const where = {}
    if(categoryId !== -1){
        where.categoryId = categoryId
    }
    return await Blog.findAndCountAll({
        where,
        include:[{
            model: BlogType,
            attributes:['name','id'],
        }],
        offset:(page - 1) * limit,
        limit:+limit,
    })
}
