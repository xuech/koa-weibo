const router = require('koa-router')()
const { isExist } =require('../../controller/user')

router.prefix('/api/user')
router.post('/register', async (ctx, next) => {
    
})

/// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})
module.exports = router