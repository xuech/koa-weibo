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
    // 删除用户失败
    deleteUserFailInfo: {
        code: 10007,
        message: '删除用户失败'
    },
    changeInfoFailInfo: {
        code: 10008,
        message: '用户更新失败'
    },
    oldPasswordFail: {
        code: 10009,
        message: '旧密码不正确'
    },
    newPasswordFail: {
        code: 10010,
        message: '新密码和旧密码相同'
    },
    changePasswordFail: {
        code: 10011,
        message: '密码更新失败'
    },
    blogCreateFailInfo: {
        code: 10020,
        message: '创建微博失败'
    },
    followFailInfo: {
        code: 10021,
        message: '关注用户失败'
    },
    unfollowFailInfo: {
        code: 10022,
        message: '取消关注用户失败'
    },
    fansFailInfo: {
        code: 10023,
        message: '获取粉丝列表失败'
    }
}