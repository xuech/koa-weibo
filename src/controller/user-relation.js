const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { followFailInfo, unfollowFailInfo,fansFailInfo } = require('../model/ErrorInfo')
const { addFollower, deleteFollower, getUserByFollower, getFollowersByUser } = require('../services/user-relation')

async function getFans(userId) {
    const fansData = await getUserByFollower(userId)
    if (fansData) {
        return new SuccessModel(fansData)
    } else {
        return new ErrorModel(fansFailInfo)
    }
}

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

async function getFollowers(userId) {
    const result = await getFollowersByUser(userId)
    const { list, count } = result
    if (result) {
        return new SuccessModel({
            count,
            list
        })
    } else {
        return new ErrorModel()
    }
}
module.exports = {
    follower,
    unfollower,
    getFans,
    getFollowers
}