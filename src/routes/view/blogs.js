const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } =require('../../controller/blog-profile')
const { getSquareBlogList } =require('../../controller/blog-square')
const { isExist } = require('../../controller/user')

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
    const loginUserInfo = ctx.session.userInfo
    const curUserName = ctx.params.userName
    let curUserInfo = null
    /// 1. 判断当前是否是自己的主页
    if (loginUserInfo.userName === curUserName) {
        curUserInfo = loginUserInfo
    } else {
        //访问的不是自己，那么就先去判断这个人是否存在，然后获取它的用户信息
        const existResult = await isExist(curUserName)
        if (existResult.code !== 200) {
            return
        }
        curUserInfo = existResult.data
    }
    /// 2. 获取该用户的微博列表
    const pageInfo = {
        pageSize: 3,
        pageIndex: 0
    }
    const result = await getProfileBlogList(curUserInfo.userName, pageInfo)
    /// 3. 解析返回的数据
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    /// 4. 获取粉丝列表

    
    await ctx.render('profile', {
        blogData: {
            count,
            isEmpty,
            blogList,
            pageIndex,
            pageSize
        },
        userData: {
            userInfo: curUserInfo,
            amIFollowed: false,
            isMe: loginUserInfo.userName === curUserName
        }

    })
})

router.get('/square', loginRedirect, async (ctx, next) => { 
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
module.exports = router