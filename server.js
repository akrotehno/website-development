var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var server = express();
server.use(express.static(__dirname));

var port = 8080;
var index = __dirname + '/index.html';

// parse application/x-www-form-urlencoded 
server.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json 
var jsonParser = bodyParser.json({
    type: 'application/*+json'
});
server.use(jsonParser);

server.get('/api/wallpapers', jsonParser, function(req, res) {
    res.contentType('json');

    fs.readdir(__dirname + "/wallpapers", function(err, files) {
        res.send(JSON.stringify({
            err: err,
            files: files
        }));
    })
})

server.get('/*', function(req, res) {
    fs.readFile(index, 'utf8', function(err, data) {

        res.send(data);
    });
});

server.listen(port, function() {
    console.log('server listening on port ' + port);
});