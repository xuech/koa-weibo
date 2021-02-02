const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount, getAtUserBlogList,updateAtRelation } = require('../services/blog-at')

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

async function markAsIsRead(userId) {
    /// 第一个参数是要更新的值，第二个参数是查询条件，满足userId，并且isRead=false的数据
    await updateAtRelation(true, { userId , isRead: false})
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsIsRead
}
