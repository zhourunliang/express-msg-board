const user = require('../model/user')

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data){
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var login = {
    path: '/user/login',
    method: 'get',
    func: function(request, response) {
        response.render('user_login')
        // var path = 'user_login.html'
        // sendHtml(path, response)
    }
}

var do_login = {
    path: '/api/user/do_login',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // console.log('do_login', form)
        // 插入新数据并返回
        var b = user.login(form)
        // console.log('b', b)
        if (b) {
            r = {
                'msg':'登陆成功',
                'status':true
            }
            request.session.username = form.name // 登录成功，设置 session
            // response.redirect('/')
        }else{
            r = {
                'msg':'登陆失败',
                'status':false
            }
        }
        response.send(r)
    }
}

var logout = {
    path: '/user/logout',
    method: 'get',
    func: function(request, response) {
        request.session.username = null; // 删除session
        response.redirect('/');
    }
}


var register = {
    path: '/user/register',
    method: 'get',
    func: function(request, response) {
        var path = 'user_register.html'
        sendHtml(path, response)
    }
}

var do_register = {
    path: '/api/user/do_register',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // console.log('do_register', form)
        // 插入新数据并返回
        var b = user.new(form)
        // console.log('b', b)
        if (b) {
            r = {
                'data':JSON.stringify(b),
                'msg':'注册成功',
                'status':true
            }
        }else{
            r = {
                'data':'',
                'msg':'用户重复，注册失败',
                'status':false
            }
        }
        // var r = JSON.stringify(b)

        response.send(r)
    }
}

var routes = [
    login,
    register,
    do_login,
    do_register,
    logout,
]

module.exports.routes = routes
