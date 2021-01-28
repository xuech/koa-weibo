/**
 * @description user controller
 */
const { getUserInfo, registerUser, deleteUser, updateUser, updatePassword } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    changeInfoFailInfo,
    oldPasswordFail,
    newPasswordFail,
    changePasswordFail
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
  * 用户名是否存在
  * @param {String} username 
  */
async function isExist(username) {
    const userData = await getUserInfo(username)
    // 处理返回给客户端的格式
    if (userData) {
        return new SuccessModel(userData)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 
 * @param {*} param0 
 */
async function doRegister({userName, password, gender}) {
    const userData = await getUserInfo(userName)
    // 处理返回给客户端的格式
    if (userData) {
        return new ErrorModel(registerUserNameExistInfo)
    }
  
    try {
        await registerUser({userName, password: doCrypto(password), gender})
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
  
}

async function doLogin({ctx, userName, password }) {
    // 未注册
    // 密码不对
    const userData = await getUserInfo(userName, doCrypto(password))
    if (userData) {
        ctx.session.userInfo = userData
        return new SuccessModel()
    } else {
        return new ErrorModel(loginFailInfo)
    }
}

async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    } else {
        return new ErrorModel(deleteUserFailInfo)
    }
}

async function changeInfo({ ctx, nickName, city }) {
    const { userName } = ctx.session.userInfo
    const res = await updateUser({ userName, nickName, city })
    if (res) {
        Object.assign(ctx.session.userInfo, {nickName, city})
        return new SuccessModel()
    } else {
        return new ErrorModel(changeInfoFailInfo)
    }
}

async function changePassword({ ctx, password, newPassword}) {
    if (doCrypto(password) !== ctx.session.userInfo.password) {
        return new ErrorModel(oldPasswordFail)
    }
    if (password === newPassword) {
        return new ErrorModel(newPasswordFail)
    }
    const { userName } = ctx.session.userInfo
    const doCryptoPassword = doCrypto(newPassword)
    const res = await updatePassword({userName, password: doCrypto(password), doCryptoPassword})
    if (res) {
        ctx.session.userInfo.password = doCryptoPassword
        return new SuccessModel()
    } else {
        return new ErrorModel(changePasswordFail)
    }
}

/**
 * 退出登录
 * @param {ctx} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    doRegister,
    doLogin,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}