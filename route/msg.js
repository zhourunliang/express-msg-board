const msg = require('../model/msg')

var all = {
    path: '/api/msg/all',
    method: 'get',
    func: function(request, response) {
        var msgs = msg.all()
        var r = JSON.stringify(msgs)
        response.send(r)
    }
}

var add = {
    path: '/api/msg/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // console.log('add', form)
        form.author = request.session.username
        // 插入新数据并返回
        var b = msg.new(form)
        var r = JSON.stringify(b)

        response.send(r)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
