const Comment = require('../modules/Comment')

// 添加评论
exports.addComment = async function(obj){
    return await Comment.create(obj)
}

// 删除单条评论
exports.deleteComment = async function(id){
    return await Comment.destroy({
        where:{
            id
        }
    })
}

// 删除文章下所有评论
exports.deleteComments = async function(blogId){
    return await Comment.destroy({
        where:{
            blogId
        }
    })
}

// 修改评论
exports.updateComment = async function(id,obj){
    return await Comment.update(obj,{
        where:{
            id
        }
    })
}

// 获取评论
exports.getCommentById = async function(id){
    return await Comment.findByPk(id)
}

// 分页获取博客文章评论
exports.getComments = async function({blogId,page = 1, limit = 10}){
    if(!blogId){
        throw Error('文章获取错误，未发现该文章')
    }
    return await Comment.findAndCountAll({
        where:{
            blogId
        },
        offset:(page-1)*limit,
        limit:+limit
    })
}