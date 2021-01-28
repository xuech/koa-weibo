const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redisKoa = require('koa-redis')
const genericSession = require('koa-generic-session')
const { REDIS_CONF } = require('./conf/db')
const blogsRouter = require('./routes/view/blogs')
const user = require('./routes/view/user')
const userAPI = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogProfileAPIRouter = require('./routes/api/blog-profile')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.keys = ['Uxs*&123SAs#']
app.use(genericSession({
    key: 'weibo.sid',
    prefix: 'weibo:sess:',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24*60*60*1000
    },
    store: redisKoa({
        all: `${REDIS_CONF.host}:${REDIS_CONF.prot }`
    })
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(userAPI.routes(), userAPI.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(), blogProfileAPIRouter.allowedMethods())
app.use(blogsRouter.routes(), blogsRouter.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //404 放在最下

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
