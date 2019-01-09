var ajax = function(request) {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function

    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

//判空
function strIsEmpty(str){
    if (str == "" || str == null || typeof(str) == "undefined") {
        return true;
    }else{
        return false;
    }

}


var showAlert = function(msg, status=true){
    var div = document.querySelector('#id-div-alert')
    if(status){
        div.innerHTML = `<div class="alert alert-success">${msg}</div>`
    }else{
        div.innerHTML = `<div class="alert alert-warning">${msg}</div>`
    }
}

var register = function(form) {

    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/user/do_register',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            // console.log('响应', response)
            var res = JSON.parse(response)
            if (res.status) {
                showAlert(res.msg)
                self.location.href="/user/login"
            }else{
                showAlert(res.msg, false)
            }
        }
    }
    ajax(request)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var bindEvents = function() {
    // 绑定发表新留言事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event){
        // console.log('click new')
        // 得到用户填写的数据
        var form = {
            name: e('#id-input-name').value,
            password: e('#id-input-password').value,
            repassword: e('#id-input-repassword').value,
        }
        if (strIsEmpty(form.name)) {
            showAlert('请输入姓名', false)
            return false
        }else if(strIsEmpty(form.password)){
            showAlert('请输入密码', false)
            return false
        }else if(strIsEmpty(form.repassword)){
            showAlert('请重新输入密码', false)
            return false
        }else if(form.password != form.repassword){
            showAlert('两次输入密码不一致', false)
            return false
        }
        register(form)
    })
}

var __main = function() {
    // 绑定事件
    bindEvents()
}

__main()
