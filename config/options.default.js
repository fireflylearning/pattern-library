/* jshint node: true */
'use strict';
var paths = require('./paths.js');

module.exports = {

    browserSync: {
        open: false,
        server: {
            baseDir: './' + paths.dest
        }
    },
    isDebugging: true,
    isProduction: false

};
