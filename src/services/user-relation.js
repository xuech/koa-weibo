const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
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

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId followerId
 */
async function getUserByFollower(followerId) {
    const result = await User.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        attributes: ['id','userName', 'nickName', 'picture'],
        include: [
            {
                model: UserRelation,
                where: { followerId }
            }
        ]
    })
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    
    return {
        count: result.count,
        list: userList
    }
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowersByUser(userId) { 
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id','userName', 'nickName', 'picture'],
            }
        ],
        where: { userId }
    })
    let userList = result.rows.map(row => row.dataValues)
    // userList = formatUser(userList)
    userList = userList.map(item => {
        let user = item.user.dataValues
        return formatUser(user)
    })
    
    return {
        count: result.count,
        list: userList
    }

}


module.exports = {
    addFollower,
    deleteFollower,
    getUserByFollower,
    getFollowersByUser
}