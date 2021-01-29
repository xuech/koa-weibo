const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { followFailInfo, unfollowFailInfo } = require('../model/ErrorInfo')
const { addFollower, deleteFollower } = require('../services/user-relation')

async function follower(userId, currentId) {
    try {
        await addFollower(userId, currentId)
        return new SuccessModel()
    } catch (error) {
        return new ErrorModel(followFailInfo)
    }
}

async function unfollower(userId, currentId) {
    const result = await deleteFollower(userId, currentId)
    if (result) {
        return new SuccessModel()
    } else {
        return new ErrorModel(unfollowFailInfo)
    }
}

module.exports = {
    follower,
    unfollower
}