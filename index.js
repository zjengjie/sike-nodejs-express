var http = require('http');

var myexpress = function(req, res) {
		res.writeHead(404);
		res.end();
	}

myexpress.listen = function(port, callback) {
	var server = http.createServer(function(req, res) {
		res.writeHead(404);
		res.end();
	});
	server.listen(port, callback);
	return server;
}

module.exports = function() {
	return myexpress;
}
