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
    isProduction: false,
    browserList: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4']

    /**
     * Set this option in local options file
     * `options.local.js` to override, eg:
     * exportPath:'export/'
     *
     */

};
