### 基于express的留言板

+ node.js的express框架
+ 注册登陆功能
+ json文件作为数据库
+ ajax提交

### 本地环境配置
+ 安装node.js
+ 安装express相关的库
+ 克隆项目到本地
```bash
git clone https://github.com/zhourunliang/express-msg-board
```
+ 安装相关库
```bash
# 该模块能够让我们快速的搭建一个 Web 开发框架。
npm install express --save 
# 该模块是 Express 模块的中间件，方便我们解析浏览器发送来的 body 数据。
npm install body-parser --save
# 该模块也是 Express 模块中间件，方便我们处理客户端的 session。
npm install express-session --save
# 该模块是一个渲染引擎。 方便我们将后台变量数据绑定到前台页面上。
npm install ejs --save
```
+ 运行程序
```bash
node app.js
```
+ 用浏览器访问http://127.0.0.1:8081
