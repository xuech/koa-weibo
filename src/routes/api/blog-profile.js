const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follower, unfollower } = require('../../controller/user-relation')
const { changeBlogsListToStr } = require('../../utils/blog')

router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, { pageIndex, pageSize: 3 })
    // 利用ejs框架将获取到的新数据渲染成string拼接到页面中
    result.data.blogListTpl = changeBlogsListToStr(result.data.blogList)
    ctx.body = result
})

/**
 * @description 关注某个用户
 */
router.post('/follow', loginCheck, async (ctx, next) => {
    const followId = ctx.request.body.userId
    const { id: curId } = ctx.session.userInfo
    ctx.body = await follower(curId, followId)
})

/**
 * @description 取消关注
 */
router.post('/unfollow', loginCheck, async (ctx, next) => {
    const followId = ctx.request.body.userId
    const { id: curId } = ctx.session.userInfo
    ctx.body = await unfollower(curId, followId)
})
module.exports = router