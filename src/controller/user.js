/**
 * @description user controller
 */
const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
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

module.exports = {
    isExist
}