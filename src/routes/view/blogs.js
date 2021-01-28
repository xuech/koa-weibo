const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } =require('../../controller/blog-profile')

router.get('/',loginRedirect, async (ctx, next) => {
    await ctx.render('index', ctx.session.userInfo)
})
// 访问自己的主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
// 访问别人的主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    const curUserName = ctx.params.userName
    let name = null
    /// 1. 判断当前是否是自己的主页
    if (userName === curUserName) {
        name = userName
    } else {
        name = curUserName
    }
    /// 2. 获取该用户的微博列表
    const pageInfo = {
        pageSize: 10,
        pageIndex: 0
    }
    const result = await getProfileBlogList(name, pageInfo)
    /// 3. 解析返回的数据
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('profile', {
        blogData: {
            count,
            isEmpty,
            blogList,
            pageIndex,
            pageSize
        },
        userData: {
            userInfo: ctx.session.userInfo
        }

    })
})
module.exports = router