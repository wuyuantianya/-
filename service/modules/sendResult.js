// 对响应消息体进行包装
exports.getMsg = function(data){
    return {
        code:200,
        msg:'',
        data
    }
}
exports.getErr = function(err){
    return {
        code:500,
        msg:err,
        data:null
    }
}