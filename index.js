var http = require('http');



var myexpress = function (req, res) {
	var i = 0;
	var next = function () {
		var middleware = myexpress.stack[i];
		if (middleware == undefined) {
			return;
		}
		i++;
		middleware(req, res, next);
	}

	next();
	res.writeHead(404);
	res.end();
}

function init() {
	myexpress.stack = [];
}

myexpress.listen = function (port, callback) {
	var server = http.createServer(myexpress);
	server.listen(port, callback);
	return server;
}

myexpress.stack = [];

myexpress.use = function (middleware) {
	this.stack.push(middleware);
}

module.exports = function () {
	init();
	return myexpress;
}
