const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { blogCreateFailInfo } = require('../model/ErrorInfo')
const { create, getFollowersBlogList } = require('../services/blog-home')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/blog-atRelation')

async function createBlog(userId, content) {
    //1. 分析content中有没有@某人
    //2. 获取所有用户名然后拿到对应的userid
    //3. 对所有的userid和blogid做关联
    let userNameList = []
    content = content.replace(/@(.+?)\s-\s(.+?)\b/g, (matchStr, userName, nickName) => {
        userNameList.push(userName)
        return matchStr
    })
    const userInfoList = await Promise.all(
        userNameList.map(userName => getUserInfo(userName))
    )

    const userIdList = userInfoList.map(user => user.id)
    
    try {
        // 4. 创建微博
        const blog = await create(userId, xss(content))
        // 5. 创建@关系
        await Promise.all(
            userIdList.map(id => createAtRelation(id, blog.id))
        )
        return new SuccessModel(blog)
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