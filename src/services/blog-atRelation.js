const { AtRelation } = require('../db/model/index')

async function createAtRelation(userId, blogId) {
    const relation = await AtRelation.create({
        userId, blogId
    })
    return relation.dataValues 
}

module.exports = {
    createAtRelation
}