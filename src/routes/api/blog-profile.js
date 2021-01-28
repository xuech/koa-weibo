const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
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

module.exports = router