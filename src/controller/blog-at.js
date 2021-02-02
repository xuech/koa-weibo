const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount, getAtUserBlogList } = require('../services/blog-at')

async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: 10
    })
    const { count, blogList } = result
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        count,
        blogList,
        pageIndex,
        pageSize: 10
    })
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList
}
