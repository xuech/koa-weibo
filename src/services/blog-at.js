const { AtRelation, Blog, User } = require('../db/model')
const { formatBlog, formatUser } = require('./_format')

async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
}

async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: { userId }
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(user => {
        user.user = formatUser(user.user.dataValues)
        return user
    })
    return {
        count: result.count,
        blogList
    }
}

async function updateAtRelation(updateVal, { userId, isRead}) {
    const result = await AtRelation.update({ isRead: updateVal }, {
        where: {
            userId,
            isRead
        }
    })
    return result[0] > 0
}

module.exports = {
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}