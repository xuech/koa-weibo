const router = require('koa-router')()
const { loginCheck } = require('../middlewares/loginChecks')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        message: 'I am xuech',
        isMe: false,
        users: [{ 
            name: 'xuech',
            age: 10
        }, {
            name: 'qww',
            age:11
        }, {
            name: 'lis',
            age: 13
        }]
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json',loginCheck, async (ctx, next) => {
    const ses = ctx.session
    if (ses.viewNum == null) {
        ses.viewNum = 0
    }
    ses.viewNum++
    ctx.body = {
        title: 'koa2 json',
        viewNum: ses
    }
})

module.exports = router
