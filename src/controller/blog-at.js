const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount } = require('../services/blog-at')

async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

module.exports = {
    getAtMeCount
}
