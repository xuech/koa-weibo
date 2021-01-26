# koa-weibo
仿新浪微博的后端项目

## 一、初始化项目
1. 通过脚手架创建项目`koa2 -e koa-generator`
2. 安装`cross-env`设置环境变量
3. 将项目上传到github
4. 调整目录结构将源文件放在src文件下，修改www下的app入口路径

## 二、数据库学习
1. 建表、基本sql语句
```sql
-- INSERT INTO users(username, `password`, nickname) VALUES ('qww', '123456', 'qww')
-- 查询
-- SELECT username, nickname from users WHERE username='xuech' and `PASSWORD` = '123456'
-- 插入
-- INSERT INTO blogs(title, content, userId) VALUES ('1123', '3213', 3)
-- 更新
-- update blogs set content='更新内容' WHERE id='1'
-- 删除
-- DELETE FROM users WHERE id=2
-- 倒序
-- SELECT * FROM blogs ORDER BY id DESC
-- 计算总数
-- SELECT COUNT(*) AS `count` FROM blogs
-- 连表查询
-- SELECT * FROM blogs INNER JOIN users ON users.id = blogs.userId
```
2. 外键&连表查询
   外键：建立表与表之间的练习
   外键约束：
    1. CASCADE：级联删除，删除主表的同时将对应的外键表一同删除
    例如：删除user表中id为1的数据，那么同时可以删除blogs表中该id所创建的所有数据
    2. RESTRICT： 当在主键表中删除对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除。
    3. SET NULL：当在主键表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null。

## 三、eslint、pre-commit等项目规范
1. 新增 `.eslintignore` `.eslintrc.json`等文件
2. 安装`babel-eslint`、`eslint`插件
3. 安装`pre-commit`预验
4. inspact调试

## 四、jwt 与 session 
### 基于session的用户认证
1. 用户输入登录信息
2. 服务器验真信息是否正确，并创建一个session，然后将其存储在数据库中
3. 服务器为用户生成一个sessionId，将具有sessionId的Cookie放置在用户浏览器中
4. 在后续请求中，会根据数据库验证sessionID，如有效则接受请求
5. 一旦用户注销程序，会话将在客户端和服务器端都被销毁

### 基于token的用户认证
1. 用户输入其登录信息
2. token储在客户端，例如存在local storage或cookie中
3. 之后的HTTP请求都将token添加到请求头里
4. 服务器解码JWT，并且如果令牌有效，则接受请求
5. 一旦用户注销，令牌将在客户端被销毁，不需要与服务器进行交互一个关键是，令牌是无状态的。后端服务器不需要保存令牌或当前session的记录。

### 区别和优缺点
1. 用户状态保存的位置不同：session是保存在服务端的，而jwt是保存在客户端的
2. 由于jwt的payload是使用base64编码的，并没有加密，因此jwt中不能存储敏感数据。而session的信息是存在服务端的，相对来说更安全。