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
            <p class="text-right"><span>${author}</span>@<time>${time}</time></p>
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


var bindEvents = function() {
    // 绑定发表新留言事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event){
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

var __main = function() {
    // 载入留言列表
    msgAll()
    // 绑定事件
    bindEvents()
}

__main()
