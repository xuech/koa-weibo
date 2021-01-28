const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { blogCreateFailInfo } = require('../model/ErrorInfo')
const { create } = require('../services/blog-home')

async function createBlog(userId, content) {
    try {
        await create(userId, xss(content))
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(blogCreateFailInfo)
    }
}

module.exports = {
    createBlog
}