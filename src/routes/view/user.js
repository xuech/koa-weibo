const router = require('koa-router')()

function getUserInfo(ctx) {
    let data = {
        isLogin: false,
        userName: ''
    }
    if (ctx.session.userInfo) {
        data.isLogin = true
        data.userName = ctx.session.userInfo.userName
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getUserInfo(ctx))
})
router.get('/register', async (ctx, next) => {
    await ctx.render('register', getUserInfo(ctx))
})
module.exports = router