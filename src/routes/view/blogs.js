const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } =require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getHomeBlogList } = require('../../controller/blog-home')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')

router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo
    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansData = await getFans(userId)

    const followersData = await getFollowers(userId)

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: fansData.data,
            followersData: followersData.data,
            atCount: 1
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
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
    const fansData = await getFans(curUserInfo.id)
    const amIFollowed = fansData.data.list.some(fans => fans.userName === loginUserInfo.userName)

    /// 5. 获取关注人列表
    const followersData = await getFollowers(curUserInfo.id)
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
            amIFollowed,
            isMe: loginUserInfo.userName === curUserName,
            fansData: fansData.data,
            followersData: followersData.data
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