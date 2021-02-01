const { AtRelation } = require('../db/model')

async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
}

module.exports = {
    getAtRelationCount
}