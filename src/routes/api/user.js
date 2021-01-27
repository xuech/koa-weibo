const router = require('koa-router')()
const { isExist, doRegister, doLogin } =require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/user')
/// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

/// 用户名注册
router.post('/registerUser', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await doRegister({ userName, password, gender })
})

/// 用户登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await doLogin({ctx, userName, password })
})
module.exports = router