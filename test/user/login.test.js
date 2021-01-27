const serve = require('koa-static')
const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}
let COOKIE = ''
// 用户注册
test('注册用户', async () => {
    const res = await server.post('/api/user/registerUser').send(testUser)
    expect(res.body.code).toBe(200)
})

test('重复注册', async () => {
    const res = await server.post('/api/user/registerUser').send(testUser)
    expect(res.body.code).not.toBe(200)
})

test('查询注册的用户名，应该存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.code).toBe(200)
})

test('用户登录，应该成功', async () => {
    const res = await server.post('/api/user/login').send({ userName, password})
    expect(res.body.code).toBe(200)

    COOKIE = res.headers['set-cookie'].join(';')
})

test('删除用户，应该成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE)
    expect(res.body.code).toBe(200)
})