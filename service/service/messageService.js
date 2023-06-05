const Message = require('../modules/Message')

// 添加留言
exports.addMessage = async function(MessageObj){
    return await Message.create(MessageObj)
}
// 删除留言
exports.deleteMessage = async function(id){
    return await Message.destroy({
        where:{
            id
        }
    })
}
// 修改留言
exports.updateMessage = async function(id,MessageObj){
    return await Message.update(MessageObj,{
        where:{
            id
        }
    })
}

// 分页获取留言
exports.getMessages = async function({page=1,limit=10}){
    return await Message.findAndCountAll({
        offset:(page-1)*limit,
        limit:+limit
    })
}

// 获取单条留言
exports.getMessageById = async function(id){
    return await Message.findByPk(id)
}