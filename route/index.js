var index = {
    path: '/',
    method: 'get',
    func: function(request, response) {
        response.render('msg_index',{username : request.session.username})
    }
}

var routes = [
    index,
]

module.exports.routes = routes
