/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-17 01:09:28
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-17 21:27:59
 * @FilePath: \blogDB\service\BlogType.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const BlogType = require('../modules/BlogType')

// 添加分类
exports.addBlogType = async function(obj){
    obj = {
        name:obj.name,
        articleCount:0,//新建分类默认为0
        order:obj.order,
    }
    return await BlogType.create(obj)
}
// 删除分类
exports.deleteBlogType = async function(id){
    console.log(id)
    return await BlogType.destroy({
        where:{
            id
        }
    })
}
// 更改分类
exports.updateBlogType = async function(obj,id){
    await BlogType.update(obj,{
        where:{
            id
        }
    })
    return await exports.getBlogTypeById(id)
}
// 获取单个分类
exports.getBlogTypeById = async function(id){
    return await BlogType.findByPk(id)
}
// 获取分类列表
exports.getBlogTypes = async function(id){
    return await BlogType.findAndCountAll()
}

// 文章增加时触发方法
exports.changeNumber = async function(){}