const { get, set } = require('./_redis')
const { getBlogsByUser } = require('../services/blog-profile')

const KEY_PREFIX = 'weibo:square:'

async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
    const cacheResult = await get(key)
    if (cacheResult != null) {
        return cacheResult
    }
    const pageInfo = {
        pageIndex, pageSize
    }
    const result = await getBlogsByUser('', pageInfo)
    set(key,result,60)
    return result
}
module.exports = {
    getSquareCacheList
}