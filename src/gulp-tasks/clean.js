'use strict';

var del = require('del');

module.exports = function(gulp, plugins) {
    return function getClean(src) {
        return function clean() {
            return del(src);
        }
    }
}
