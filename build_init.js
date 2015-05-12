var CleanCSS = require('clean-css');
var fs = require("fs");
var rimraf = require('rimraf');

var cheerio = require('cheerio');
var minify = require('html-minifier').minify;
var domain_net = 'akrotehno.github.io';

var config = require(__dirname + '/build_config.json');

//GENERATE DATA

fs.readdir(__dirname + "/assets/images/wallpapers", function(err, files) {
    var data = JSON.stringify({
        err: err,
        files: files
    });

    fs.writeFile(__dirname + '/assets/json/wallpapers.json', data, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});

// OUTPUT FILES

var ncp = require('ncp').ncp;
ncp.limit = 16;

var dirs = [{
    src: 'assets',
    dst: 'assets'
}, {
    src: 'includes',
    dst: 'includes'
}];

if (config.minify) {
    dirs.push({
        src: 'builds/scripts',
        dst: 'assets/scripts'
    });
}

var outputDir = 'output';
var outputDirAbs = __dirname + '/' + outputDir;
var index = 0;

function nextNCP() {
    if (index >= dirs.length) {
        processHTML();
        return;
    }
    var dir = dirs[index];
    index++;

    var source = __dirname + '/' + dir.src;
    var destination = outputDirAbs + '/' + dir.dst;

    rimraf(destination, function() {

        ncp(source, destination, function(err) {
            if (err) {
                return console.error(err);
            }
            nextNCP();
        });
    });

}

nextNCP();

///

var htmls = [];

function processHTML() {

    var filename = __dirname + '/index.html';
    fs.readFile(filename, 'utf8', function(err, data) {

        if (err) throw err;

        var $ = cheerio.load(data);
        var output = '';

        if (config.minify) {

            $('script').each(function(index) {

                $(this).remove();

            });

            $('head').append('<script src="//' + domain_net + '/assets/scripts/minified.js"></script>');
        }

        htmls.push({
            src: outputDirAbs + '/index.html',
            data: $.html()
        });

        minifyHTMLs();

    });

}

var indexHTML = 0;

function minifyHTMLs() {

    if (indexHTML >= htmls.length) {
        return;
    }
    var html = htmls[indexHTML];
    indexHTML++;

    var result = minify(html.data, {
        removeComments: true,
        collapseWhitespace: true
    });

    fs.writeFile(html.src, result, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

//CSS
//var source = 'a{font-weight:bold;}';
//var minified = new CleanCSS().minify(source).styles;