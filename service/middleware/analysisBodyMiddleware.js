const qs = require('querystring')
// 解析消息体
module.exports = function(req,res,next){
    // 判断是那种格式消息体
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
        let result = ''
        req.on('data',(chunk)=>{
            result += chunk.toString('utf-8')
        })
        req.on('end',()=>{
            const query = qs.parse(result)
            console.log(query)
            req.body = query
            next()
        })
    }else{
        next()
    }
}