/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {String} userName 
 * @param {String} password 
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        // attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }
    //有些用户可能没有图片等信息，所以对返回的数据做格式化处理
    return formatUser(result.dataValues)
}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} gender 性别
 * @param {string} nickName 昵称
 */
async function registerUser({userName, password, gender = 3, nickName}) {
    const user = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })
    return user.dataValues
}

/**
 * 删除用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
    const data = await User.destroy({
        where: {
            userName
        }
    })
    return data > 0
}

module.exports = {
    getUserInfo,
    registerUser,
    deleteUser
}