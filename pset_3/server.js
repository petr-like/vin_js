var http = require('http');
var app = require('./app');


var fs = require('fs');


var server = http.createServer(function(req, res){
	fs.readFile('index.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
		app(Date());
		
	});
	
});

server.listen(80);