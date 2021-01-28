const User = require('./User') 
const Blog = require('./Blog') 

/// 多对一关系 查微博时顺带查出用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

/// 一对多关系 查用户时顺带查出该用户的微博
// User.hasMany(Blog, {
//     foreignKey: 'blogId'
// })

module.exports = {
    User,
    Blog
}