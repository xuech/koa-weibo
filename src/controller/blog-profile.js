const { SuccessModel } = require('../model/ResModel')
const { getBlogsByUser } = require('../services/blog-profile')

async function getProfileBlogList(userName, pageInfo) {
    const res = await getBlogsByUser(userName, pageInfo)

    const { blogList, count } = res
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        count,
        blogList,
        pageIndex: pageInfo.pageIndex,
        pageSize: pageInfo.pageSize
    })
}

module.exports = {
    getProfileBlogList
}