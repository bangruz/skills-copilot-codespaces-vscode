// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create server
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/') {
        // read html file
        fs.readFile('index.html', function(err, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (pathname == '/comment') {
        // get post data
        var body = '';
        request.on('data', function(data) {
            body += data;
        });

        request.on('end', function() {
            var post = qs.parse(body);
            var comment = post.comment;
            console.log(comment);
            // save comment to file
            fs.appendFile('comment.txt', comment + '\n', 'utf8', function(err) {
                if (err) throw err;
                console.log('saved');
            });
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('ok');
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('page not found');
    }
}).listen(8080);
console.log('server running at http://localhost:8080/');