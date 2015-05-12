var UglifyJS = require("uglify-js");
var cheerio = require('cheerio');
var fs = require('fs');
var str_slice = '//localhost:8080';

var filename = __dirname + '/index.html';
fs.readFile(filename, 'utf8', function(err, data) {

    if (err) throw err;

    var $ = cheerio.load(data);
    var output = '';

    $('script').each(function(index) {

        var src = $(this).attr('src');
        var minify = $(this).attr('minify');
        var result = null;

        src = src.replace(str_slice, __dirname); 

        switch (minify) {
            case 'yes':
                result = UglifyJS.minify(src);
                output += result.code;
                break;
            case 'no':
                output += fs.readFileSync(src);
                break;
        }
    });

    fs.writeFile(__dirname + '/builds/scripts/minified.js', output, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});