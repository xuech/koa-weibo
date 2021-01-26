const router = require('koa-router')()

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

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router
