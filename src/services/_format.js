/**
 * @description 对返回的数据做格式化处理
 */
/// It's like Lodash for dates https://www.npmjs.com/package/date-fns
const { format } = require('date-fns')

function _formatObj(obj) {
    if (obj.picture == null) {
        obj.picture = 'https://images.dog.ceo/breeds/labrador/n02099712_9374.jpg'
    }
    return obj
}

function _formatDBTime(obj) {
    obj.createdAtFormat = format(new Date(obj.createdAt), 'MM.dd HH:mm')
    obj.updatedAtFormat = format(new Date(obj.updatedAt), 'MM.dd HH:mm')
    return obj
}

function _formatContent(obj) {
    // 正则表达式，匹配 '@昵称 - userName'
    const regRole = /@(.+?)\s-\s(\w+?)\b/g   
    obj.contentFormat = obj.content.replace(regRole,(matchStr, nickName, userName) => {
        return `<a href="/profile/${userName}">@${nickName}</a>`
    })
    return obj
}

/**
 * 对传进来的数据做分类处理
 * @param {Array | Object} params 
 */
function formatUser(params) {
    // 有可能是数组
    if (params instanceof Array) {
        return params.map(_formatObj)
    }
    // 有可能是对象
    return _formatObj(params)
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatDBTime).map(_formatContent)
    }
    // 对象 
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUser,
    formatBlog
}