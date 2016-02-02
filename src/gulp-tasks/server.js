'use strict';

var browserSyncFactory = require('browser-sync');

module.exports = function(gulp, plugins, config) {
    var browserSync = browserSyncFactory.create();

    return {
        browserSync: browserSync,
        initBrowserSync: function() {
            return function() {
                browserSync.init(config.browserSync);
            };
        }
    };
};
