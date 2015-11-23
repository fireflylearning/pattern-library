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

    /**
     * Set this option in local options file
     * `options.local.js` to override, eg:
     * exportPath:'export/'
     *
     */

};
