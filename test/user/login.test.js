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

// 用户注册
test('注册用户', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.code).toBe(0)
})