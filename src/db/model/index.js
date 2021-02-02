const User = require('./User') 
const Blog = require('./Blog') 
const UserRelation = require('./UserRelation') 
const AtRelation = require('./AtRelation') 

// const A = sequelize.define('A', /* ... */);
// const B = sequelize.define('B', /* ... */);

// A.hasOne(B) 关联意味着 A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.
// A.belongsTo(B)关联意味着 A 和 B 之间存在一对一的关系,外键在源模型中定义(A).
// A.hasMany(B) 关联意味着 A 和 B 之间存在一对多关系,外键在目标模型(B)中定义.

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