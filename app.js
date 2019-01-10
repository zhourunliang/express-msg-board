// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var session = require('express-session');
var bodyParser = require('body-parser')

// 下面三行设置渲染的引擎模板
app.set('views', __dirname +'/template'); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyParser.json())
// 配置静态文件目录
app.use(express.static('static'))

// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));


const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        // 下面这段是重点
        app[route.method](route.path, route.func)
    }
}

// const routeModules = [
//     './route/index',
//     './route/msg',
// ]

// 导入 route/index.js 的所有路由数据
const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)

// 导入 route/msg 的所有路由数据
const routeMsg = require('./route/msg')
registerRoutes(app, routeMsg.routes)

// 导入 route/user 的所有路由数据
const routeUser = require('./route/user')
registerRoutes(app, routeUser.routes)

// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
