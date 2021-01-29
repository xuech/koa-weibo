const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

async function getSquareBlogList(pageIndex = 0) {
    const res = await getSquareCacheList(pageIndex, 10)
    const { blogList, count } = res
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        count,
        blogList,
        pageIndex,
        pageSize: 10
    })
}

module.exports = {
    getSquareBlogList
}