var fs = require('fs')

var filePath = 'db/user.json'

// 这是一个用来存储 数据的对象
const Model = function(form) {
    // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
    this.name = form.name || ''
    this.password = form.password || ''
    // 生成一个 unix 时间
    this.created_time = Math.floor(new Date() / 1000)
}

const loadModel = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(filePath, 'utf8')
    var data = JSON.parse(content)
    return data
}

/*
b 这个对象是我们要导出给别的代码用的对象
它有一个 data 属性用来存储所有的 对象
它有 all 方法返回一个包含所有数组
它有 new 方法来在数据中插入一个新的数组并且返回
他有 save 方法来保存更改到文件中
*/
var b = {
    data: loadModel()
}

b.all = function() {
    var data = this.data
    return data
}

b.new = function(form) {
    var m = new Model(form)
    
    // console.log('new msg', form, m)
    // 设置新数据的 id
    var d = this.data[this.data.length-1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    //检查姓名是否重复
    var check= this.data.filter((item)=>item.name == m.name)
    // console.log('check', check)
    if (check.length > 0) {
        return false
    }

    // 把 数据 加入 this.data 数组
    this.data.push(m)
    // 把 最新数据 保存到文件中
    this.save()
    // 返回新建的数据
    return m
}

b.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(filePath, s, (err) => {
      if (err) {
        //   console.log(err)
      } else {
        //   console.log('保存成功')
      }
    })
}

b.login = function(form) {

    //检查姓名是否重复
    var check= this.data.filter((item)=>item.name == form.name && item.password == form.password)
    // console.log('check', check)
    if (check.length == 0) {
        return false
    }
    return true
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b
