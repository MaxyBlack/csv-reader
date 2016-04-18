var csv = require('csv-parser');
var fs = require('fs');

module.exports = function (file, options, rowCallback) {

    fs.createReadStream(file)
        .pipe(csv(options))
        .on('data', function (data) {
            rowCallback(data);
        });
};

