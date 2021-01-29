const { UserRelation } = require('../db/model/index')

/**
 * 
 * @param {number} userId 用户id
 * @param {number}} followerId 被关注用户id
 */
async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId, followerId
    })
    return result.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: { userId, followerId }
    })
    return result > 0
}

module.exports = {
    addFollower,
    deleteFollower
}