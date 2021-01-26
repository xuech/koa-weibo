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