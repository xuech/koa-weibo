const User = require('./User') 
const Blog = require('./Blog') 
const UserRelation = require('./UserRelation') 
const AtRelation = require('./AtRelation') 

/// 多对一关系 查微博时顺带查出用户
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

/// 一对多关系 查用户时顺带查出该用户的微博
// User.hasMany(Blog, {
//     foreignKey: 'blogId'
// })
UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}