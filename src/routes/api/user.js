const router = require('koa-router')()
const { isExist, doRegister, doLogin , deleteCurUser} =require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')

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

/// 用户删除
router.post('/delete',loginCheck, async (ctx, next) => {
    // if (isTest) {
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
    // }
})
module.exports = router