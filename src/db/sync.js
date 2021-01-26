const seq = require('./seq')
const model = require('./model')

seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

/// 每次将表清空重新建
seq.sync({ force: true }).then(() => {
    process.exit()
})