const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar/:name/:age', function (ctx, next) {
  const { name,age } = ctx.params
  ctx.body = {
    name,
    age
  }
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  ctx.body = {
    username,
    password
  }
})

module.exports = router
