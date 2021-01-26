/**
 * @description 定义返回数据的格式
 */
class BaseModel {
    constructor({ code, data, message }) {
        this.code = code
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}
/**
 * @description 返回正确时的格式
 * data
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            code: 200,
            data
        })
    }
}

/**
 * @description 返回错误时的格式
 * code 
 * message
 */
class ErrorModel extends BaseModel {
    constructor({ code, message }) {
        console.log('code',code)
        console.log('message',message)
        super({
            code,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}