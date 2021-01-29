const seq = require('../seq')
const { Integer } = require('../type')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: Integer,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: Integer,
        allowNull: false,
        comment: '关注id'
    },
})

module.exports = UserRelation