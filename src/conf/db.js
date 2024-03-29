const { isProd } = require('../utils/env')
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

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        // 线上的 mysql 配置
        host: '114.215.182.183',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2_weibo_db'
    }
    
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}