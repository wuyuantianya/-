const Banner = require('../modules/Banner')
// 添加首页标语
exports.addBanner = async function(BannerObj){
    Banner.create(BannerObj).then(()=>{
        console.log('首页标语添加完成')
    })
}
// 删除首页标语
exports.deleteBanner = async function(BannerId){
    Banner.destroy({
        where:{
            id:BannerId
        }
    }).then(()=>{
        console.log('首页标语删除完成')
    })
}
// 修改首页标语信息
exports.updateBanner = async function(updateArr){
    for(let i = 0 ; i < updateArr.length ; i++){
        await Banner.update(updateArr[i],{
            where:{
                id:updateArr[i].id
            }
        })
    }
    return await exports.findAllBanner()
}

// 首页标语列表
exports.findAllBanner = async function(where = {}){
    return await Banner.findAndCountAll(where)
}
