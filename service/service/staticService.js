const Static = require('../modules/Static')
// 添加静态资源
exports.addStatic = async function(StaticObj){
    Static.create(StaticObj).then(()=>{
        console.log('静态资源添加完成')
    })
}
// 删除静态资源
exports.deleteStatic = async function(StaticId){
    Static.destroy({
        where:{
            id:StaticId
        }
    }).then(()=>{
        console.log('静态资源删除完成')
    })
}
// 修改静态资源信息
exports.updateStatic = async function(StaticId,StaticObj){
    Static.update(StaticObj,{
        where:{
            id:StaticId
        }
    }).then('静态资源更新完成')
}
