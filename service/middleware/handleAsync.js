const { getMsg } = require('../modules/sendResult')
// 解决异步问题
exports.handleAsync = function(fn){
    return async (req,res,next) => {
        try{
            const result = await fn(req,res,next)
            res.send(getMsg(result))
        } catch(err){
            next(err)
        }
    }
}