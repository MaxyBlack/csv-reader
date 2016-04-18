var request = require('request');
var cheerio = require('cheerio');

var csv = request('../src/csv');



var invalidProducts = [];
csv('test.csv',{
    raw: false,     // do not decode to utf-8 strings
    separator: ';', // specify optional cell separator
    quote: '"',     // specify optional quote character
    escape: '"',    // specify optional escape character (defaults to quote value)
    newline: '\n',  // specify a newline character
    strict: true    // require column length match headers length
},function (data) {
    request({
        'url': data.Product_URL, headers: {
            'User-Agent': 'googlebot'
        }
    }, function (err, resp, body) {
        $ = cheerio.load(body);
        images = $('img.large-gallery__slide-img');
        if(!$(images).length){
            invalidProducts.push(data.Product_URL);
            fs.appendFile('invalid.txt', data.Product_URL + '\n', function (err) {});
            console.log(data.Product_URL)
        }
    });
});