const seq = require('../seq')
const { Decimal,String } = require('../type')

const User = seq.define('user', {
    userName: {
        type: String,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: String,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: String,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: Decimal,
        allowNull: false,
        defaultValue: 3,
        comment: '性别（1 男性，2 女性，3 保密）'
    },
    picture: {
        type: String,
        comment: '头像，图片地址'
    },
    city: {
        type: String,
        comment: '城市'
    }
})
  
module.exports = User