/**
 * @description 封装 sequelize 数据类型
 */
const Sequelize = require('sequelize')

module.exports = {
    String: Sequelize.STRING,
    Decimal: Sequelize.DECIMAL,
    Text: Sequelize.TEXT,
    Interger: Sequelize.INTEGER,
    Boolean: Sequelize.BOOLEAN
}
