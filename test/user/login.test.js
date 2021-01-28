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

test('修改用户信息，应该成功', async () => {
    const res = await  server.patch('/api/user/changeInfo')
        .send({ nickName: '测试昵称', city: '测试城市' })
        .set('cookie', COOKIE)
    expect(res.body.code).toBe(200)

})
test('修改用户密码，应该成功', async () => {
    const res = await server.patch('/api/user/changePassword')
        .send({ password, newPassword: `p_${Date.now()}` })
        .set('cookie', COOKIE)
    expect(res.body.code).toBe(200)

})

test('删除用户，应该成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE)
    expect(res.body.code).toBe(200)
})

test('退出登录，应该成功', async () => {
    const res = await server.post('/api/user/logout').set('cookie', COOKIE)
    expect(res.body.code).toBe(200)
})

// 再次查询用户，应该不存在
test('删除之后，再次查询注册的用户名，应该不存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({ userName })
    expect(res.body.code).not.toBe(200)
})