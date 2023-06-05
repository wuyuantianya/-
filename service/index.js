require('./modules/init');
const express = require('express');
const app = express();
const part = 6090
const session = require('express-session')
// 加载静态资源
app.use(express.static('./public'))

// 解析消息体
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000*60 }}))

// 注入cookie-parser中间件，之后req就会有cookie方法
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// 解析token
app.use(require('./middleware/tokenMiddleware'))

// 验证码
app.use(require('./routes/captcha'))
// 文件上传中间件
app.use('/api/upload',require('./routes/upload'))

// 路由中间件
app.use('/api/admin',require('./routes/adminRoute'))
app.use('/api/banner',require('./routes/bannerRouter'))
app.use(require('./routes/login'))
app.use('/api/blogtype',require('./routes/blogTypeRoute'))
app.use('/api/blog',require('./routes/blogRoute'))
app.use('/api/comment',require('./routes/comment'))
app.use('/api/message',require('./routes/messageRoute'))
app.use('/api/project',require('./routes/projectRoute'))


// 错误处理中间件
app.use(require('./middleware/errorMiddleware'))
app.listen(part,()=>{
    console.log('监听6090端口')
})