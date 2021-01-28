const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/',loginRedirect, async (ctx, next) => {
    await ctx.render('index', ctx.session.userInfo)
})
module.exports = router