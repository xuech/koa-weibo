const router = require('koa-router')()
const { isExist, doRegister, doLogin , deleteCurUser, changeInfo, changePassword, logout} =require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')
const { getFollowers } = require('../../controller/user-relation')

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

/// 用户修改
router.patch('/changeInfo', loginCheck, async (ctx, next) => {
    const { nickName, city } = ctx.request.body
    ctx.body = await changeInfo({ctx, nickName, city })
})

/// 用户修改密码
router.patch('/changePassword', loginCheck, async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    ctx.body = await changePassword({ctx, password, newPassword })
})

/// 用户退出
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const result = await getFollowers(userId)
    const list = result.data.list.map(user => {
        return `${user.nickName}-${user.userName}`
    })
    // 格式如 ['张三 - zhangsan', '李四 - lisi', '昵称 - userName']
    ctx.body = list
})
module.exports = router