'use strict';

var async = require('async'),
    fs = require('fs'),
    path = require('path');

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function folderParallel(dir, task) {
    return function(done) {
        var folders = getFolders(dir),
            tasks = folders.map(task);

        if (tasks.length === 0) {
            done();
        }

        async.parallel(tasks, done);
    };
}

function folderSeries(dir, task) {
    return function(done) {
        var folders = getFolders(dir),
            tasks = folders.map(task);

        if (tasks.length === 0) {
            done();
        }

        async.series(tasks, done);
    };
}

module.exports = {
    folderSeries: folderSeries,
    folderParallel: folderParallel
};
