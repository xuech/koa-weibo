module.exports = {
    // 用户名已存在
    registerUserNameExistInfo: {
        code: 10001,
        message: '用户名已存在'
    },
    // 注册失败
    registerFailInfo: {
        code: 10002,
        message: '注册失败，请重试'
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        code: 10003,
        message: '用户名未存在'
    },
    // 登录失败
    loginFailInfo: {
        code: 10004,
        message: '登录失败，用户名或密码错误'
    },
    jsonSchemaFileInfo: {
        code: 10005,
        message: '数据格式校验错误'
    },
    // 未登录
    loginCheckFailInfo: {
        code: 10006,
        message: '您尚未登录'
    },
}