/**
 * @description user controller
 */
const { getUserInfo, registerUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo
} = require('../model/ErrorInfo')
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
        await registerUser({userName, password, gender})
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
  
}

async function doLogin({ userName, password }) {
    // 未注册
    // 密码不对
    const userData = await getUserInfo(userName, password)
    if (userData) {
        return new SuccessModel()
    } else {
        return new ErrorModel(loginFailInfo)
    }
}

module.exports = {
    isExist,
    doRegister,
    doLogin
}