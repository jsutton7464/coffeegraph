http     = require 'http'
io       = require 'socket.io'
paperboy = require 'paperboy'
path     = require 'path'
sys      = require "sys"
url      = require "url"
        
PORT = 8081
WEBROOT = path.join(path.dirname(__filename), 'webroot')


server = http.createServer (req, res) ->
    parsed = url.parse(req.url, true)
    if parsed.href.indexOf("socket.io") == -1
        if parsed.href.indexOf("data") != -1
            body = 'data received: ' + parsed.query
            res.writeHead(200, { 'Content-Length': body.length, 'Content-Type': 'text/plain' })
            res.write(body)
            res.end()
        else 
            paperboy.deliver(WEBROOT, req, res)

server.listen PORT

io.listen(server).on 'connection', (client) ->
	server.on "request", (req,res) -> 
        parsed = url.parse(req.url)
        if parsed.href.indexOf("data") != -1
            client.send(parsed.query) 
