const { Blog } = require('../db/model/index')

async function create(userId, content) {
    const blog = await Blog.create({
        userId, content
    })
    return blog.dataValues
}

module.exports = {
    create
}