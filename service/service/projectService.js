/*
 * @Author: wangxie 2946459422@qq.com
 * @Date: 2023-01-01 21:58:59
 * @LastEditors: wangxie 2946459422@qq.com
 * @LastEditTime: 2023-01-18 00:55:52
 * @FilePath: \frontend-node-master\blogDB\service\ProjectService.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Project = require('../modules/Project')
// 添加项目
exports.addProject = async function(ProjectObj){
    return await Project.create(ProjectObj)
}
// 删除项目
exports.deleteProject = async function(ProjectId){
    return await Project.destroy({
        where:{
            id:ProjectId
        }
    })
}
// 修改项目信息
exports.updateProject = async function(ProjectId,ProjectObj){
    return await Project.update(ProjectObj,{
        where:{
            id:ProjectId
        }
    })
}

// 获取所有项目
exports.getProjects = async function(){
    return await Project.findAndCountAll()
}

// 获取单个项目
exports.getProjectById = async function(id){
    return await Project.findByPk(id)
}