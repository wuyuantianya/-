/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 21:58:59
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-01 22:02:45
 * @FilePath: \frontend-node-master\blogDB\service\categoryService.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Category = require('../modules/Category')
// 添加分类
exports.addCategory = async function(CategoryObj){
    Category.create(CategoryObj).then(()=>{
        console.log('分类添加完成')
    })
}
// 删除分类
exports.deleteCategory = async function(CategoryId){
    Category.destroy({
        where:{
            id:CategoryId
        }
    }).then(()=>{
        console.log('分类删除完成')
    })
}
// 修改分类信息
exports.updateCategory = async function(CategoryId,CategoryObj){
    Category.update(CategoryObj,{
        where:{
            id:CategoryId
        }
    }).then('分类更新完成')
}
