var 	http = require('http'), 
        io = require('socket.io'),
        paperboy = require('paperboy'),
  		path = require('path'),
  		sys = require("sys")
  		url = require("url");
        
PORT = 8081,
WEBROOT = path.join(path.dirname(__filename), 'webroot');


var server = http.createServer(function(req, res){
  var parsed = url.parse(req.url, true);
  if(parsed.href.indexOf("socket.io") != -1) { return; }
  else if(parsed.href.indexOf("data") != -1) { 
  		var body = 'data received: ' + parsed.query;
  		res.writeHead(200, { 'Content-Length': body.length, 'Content-Type': 'text/plain' });
  		res.write(body);
  		res.end();
  		}
  else { paperboy.deliver(WEBROOT, req, res); }
});
server.listen(PORT);

// socket.io, I choose you
var socket = io.listen(server);
socket.on('connection', function(client){
	server.on("request", function(req,res){ 
		var parsed = url.parse(req.url);
		if(parsed.href.indexOf("data") != -1) { client.send(parsed.query); }
	});
	
});
