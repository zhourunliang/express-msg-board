var msgTemplate = function(msg) {
    var id = msg.id
    var title = msg.title
    var author = msg.author
    var content = msg.content
    var d = new Date(msg.created_time * 1000)
    var time = d.toLocaleString()
    var t = `

    <div class="panel panel-default">
        <div class="panel-heading">
            ${title}
        </div>
        <div class="panel-body">
            ${content}
            <p class="text-right"><span>${author}</span>@<time>${time}</time><button type="button" class="btn btn-link button-del" data-msg-id="${id}">删除</button></p>
        </div>
    </div>
    `
    return t
}

var insertMsgAll = function(msgs) {
    var html = ''
    for (var i = 0; i < msgs.length; i++) {
        var b = msgs[i]
        var t = msgTemplate(b)
        html += t
    }
    // 把数据写入 #id-div-msg-list 中, 直接用覆盖式写入
    var div = document.querySelector('#id-div-msg-list')
    div.innerHTML = html
}

var msgAll = function() {
    var request = {
        method: 'GET',
        url: '/api/msg/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            // console.log('响应', response)
            var msgs = JSON.parse(response)
            window.msgs = msgs
            insertMsgAll(msgs)
            // var del_btns = document.querySelectorAll('.button-del')
            // console.log('del_btns', del_btns)

            delEvent()
        }
    }
    ajax(request)
}

var msgNew = function(form) {
    // var form = {
    //     title: "测试标题",
    //     author: "test",
    //     content: "测试内容",
    // }
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/msg/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            // console.log('响应', response)
            var res = JSON.parse(response)
            self.location.href="/"
        }
    }
    ajax(request)
}

var msgDel = function(msg_id) {
    var form = {
        msg_id: msg_id,
    }
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/msg/del',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            // console.log('响应', response)
            var res = JSON.parse(response)
            self.location.href="/"
        }
    }
    ajax(request)
}


var bindEvents = function() {
    // 绑定发表新留言事件
    var submit = e('#id-button-submit')
    submit.addEventListener('click', function(event){
        // console.log('click new')
        // 得到用户填写的数据
        var form = {
            title: e('#id-input-title').value,
            author: '',
            content: e('#id-input-content').value,
        }
        // 用这个数据调用 msgNew 来创建一篇新留言
        msgNew(form)
    })
}

var delEvent = function name(params) {
    //删除留言
    var del_btns = document.querySelectorAll('.button-del')
    // console.log('del_btns', del_btns)
    for (let i = 0; i < del_btns.length; i++) {
        del_btns[i].addEventListener('click', function(event){
         
            // console.log('click del')
            var el = event.target
            var msg_id = el.getAttribute("data-msg-id")
            // console.log("msg_id", msg_id)
            msgDel(msg_id)

        })
    }
}



var __main = function() {
    // 载入留言列表
    msgAll()
    // 绑定事件
    bindEvents()
}

__main()
