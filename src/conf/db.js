// const { isProd } = require('../utils/env')
/**
 * @description mysql配置
*/
let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koa2_weibo_db'
}
let REDIS_CONF = {
    host: '127.0.0.1',
    prot: '6379'
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}