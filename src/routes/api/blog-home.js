const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { createBlog } = require('../../controller/blog-home')

router.prefix('/api/blog')
router.post('/create', loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await createBlog(userId, content)
})

module.exports = router