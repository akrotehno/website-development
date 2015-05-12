var fs = require('fs');
var recursive = require('recursive-readdir');
var path = require('path');
var mkdirp = require('mkdirp');
var cheerio = require('cheerio');

var include_template = __dirname + '/output/index.html';
var source = __dirname + '/includes';
var destination = __dirname + '/output';

var config = require(__dirname + '/build_config.json');

var domain_local = 'localhost:8080';
var domain_net = config.domain[config.mode];

fs.readFile(include_template, 'utf8', function(err, data) {

    var $ = cheerio.load(data);

    $('script').each(function(index) {
        var src = $(this).attr('src');
        var res = getRel(src);
        if (res) {
            $(this).attr('src', res);
        }
    });

    $('link').each(function(index) {

        var src = $(this).attr('href');
        var res = getRel(src);
        if (res) {
            $(this).attr('href', res);
        }
    });

    function getRel(src) {
        if (src.indexOf('localhost:') != -1) {
            return src.replace(domain_local, domain_net);
        }
        return null;
    }

    var outputData = $.html();
    var outputDir = path.join(__dirname, 'output');

    recursive(source, function(err, files) {
        // Files is an array of filename
        var i = 0;

        function nextInclude() {
            if (i >= files.length) {
                return;
            }
            var file = files[i];
            i++;
            var relPath = path.relative(source, file);
            var ext = path.extname(relPath);

            if (ext != '.html') {
                nextInclude();
                return;
            }

            var targetPathA = path.join(outputDir, relPath);
            var name = path.basename(relPath, ext);
            var targetPathB = path.join(outputDir, name);
            var targetPathC = path.join(targetPathB, 'index.html');

            fs.writeFile(targetPathA, outputData, function() {
                mkdirp(targetPathB, function(err) {
                    fs.writeFile(targetPathC, outputData, nextInclude);
                });
            });

        };

        nextInclude();
    });

    fs.writeFile(path.join(outputDir, 'index.html'), outputData, function() {});

});