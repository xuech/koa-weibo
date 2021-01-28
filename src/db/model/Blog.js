const seq = require('../seq')
const { Integer, String, Text } = require('../type')

const Blog = seq.define('blog', {
    userId: {
        type: Integer,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: Text,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: String,
        comment: '图片地址'
    }
})

module.exports = Blog
