const seq = require('./seq')

require('./model/index')

seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

/// 每次将表清空重新建
seq.sync({ force: false }).then(() => {
    process.exit()
})