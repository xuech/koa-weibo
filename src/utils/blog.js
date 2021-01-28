const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
//https://www.npmjs.com/package/ejs

/**
 * 将网络请求下来的微博数据转化为ejs模版
 * @param {Array} list 获取到的更多数据
 */
function changeBlogsListToStr(blogList = []) {
    // const blogsPath = '../views/widgets/blog-list.ejs'
    //必须转为相对路径
    const blogsPath = path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
    const str = fs.readFileSync(blogsPath).toString()
    return ejs.render(str, {blogList}) 
}

module.exports = {
    changeBlogsListToStr
}