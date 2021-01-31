const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { blogCreateFailInfo } = require('../model/ErrorInfo')
const { create, getFollowersBlogList } = require('../services/blog-home')

async function createBlog(userId, content) {
    try {
        await create(userId, xss(content))
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(blogCreateFailInfo)
    }
}

async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: 10
        }
    )
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: 10,
        pageIndex,
        count
    })
}

module.exports = {
    createBlog,
    getHomeBlogList
}