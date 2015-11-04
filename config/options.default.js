/* jshint node: true */
'use strict';
var paths = require('./paths.js');

module.exports = {

        browserSync: {
            server: {
                baseDir: './' + paths.dest
            }
        }

};
