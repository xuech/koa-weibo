const seq = require('../seq')
const { Integer, Boolean } = require('../type')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: Integer,
        allowNull: false,
        comment: '用户 ID'
    },
    blogId: {
        type: Integer,
        allowNull: false,
        comment: '微博 id'
    },
    isRead: {
        type: Boolean,
        allowNull: false,
        defaultValue: false, // 默认未读
        comment: '是否已读'
    }
})

module.exports = AtRelation
