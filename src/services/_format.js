/**
 * @description 对返回的数据做格式化处理
 */

function _formatObj(obj) {
    if (obj.picture == null) {
        obj.picture = 'https://dwz.cn/rnTnftZs'
    }
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

module.exports = {
    formatUser
}