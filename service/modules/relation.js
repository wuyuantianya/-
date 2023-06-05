/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-17 17:30:03
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 23:09:39
 * @FilePath: \blogDB\modules\relation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 博客文章和分类的关系，外键存在与博客文章中
const Blog = require('./Blog');
const BlogType = require('./BlogType')
Blog.belongsTo(BlogType,{foreignKey:"categoryId",sourceKey:'id'});
BlogType.hasOne(Blog,{foreignKey:'categoryId',sourceKey:'id',as:'category'})

// 博客和博客下评论的关系（一对多），外键在评论
// const Message = require('./Message')
// Blog.hasOne(Message,{foreignKey:"blogId",sourceKey:'id'})
// Message.belongsTo(Blog,{foreignKey:'blogId',sourceKey:'id'})

// 博客和评论，外键在评论
const Comment = require('./Comment')
Blog.hasOne(Comment,{foreignKey:"blogId",sourceKey:'id'})
Comment.belongsTo(Blog,{foreignKey:'blogId',sourceKey:'id'})
