/* jshint node: true */
'use strict';

var fs = require('fs'),
    async = require('async'),
    gutil = require('gulp-util'),
    path = require('path');


function fsOperationFailed(stream, sourceFile, err) {
    if (err) {
        if (err.code !== 'ENOENT') {
            stream.emit('error', new gutil.PluginError('gulp-changed', err, {
                fileName: sourceFile.path
            }));
        }
        stream.push(sourceFile);
    }
    return err;
}

function detectSource(stream, sourceFile, targetStat) {

    return function(sourcePath, cb) {

        fs.stat(sourcePath, function(err, sourceStat) {
            var passthrough = false;
            if (fsOperationFailed(stream, sourceFile, err)) {
                passthrough = true;
            } else {
                if (sourceStat.mtime > targetStat.mtime) {
                    passthrough = true;
                }
            }
            cb(passthrough);
        });
    };
}



function getSourcePathsForBlocks(root, blocklist) {
    return function(sourceFile) {
        var blocks = sourceFile.data.blocks || blocklist;
        var sourcePaths = [];
        if (blocks) {
            blocks.forEach(function(b) {
                var base = path.join(root, b.basepath);
                sourcePaths.push(base + '.xsl');
                sourcePaths.push(base + '.xml');
                sourcePaths.push(sourceFile.path);
            });
        }
        return sourcePaths;
    };
}

function getSourcePathsForAdjacentXSL(sourceFile){
    return [sourceFile.path, gutil.replaceExtension(sourceFile.path, '.xsl')];
}

function getCompareToMultiSources(sourcePathMethod) {

    return function compareToMultiSources(stream, callback, sourceFile, targetPath) {

        var sourcePaths = sourcePathMethod(sourceFile);

        fs.stat(targetPath, function(err, targetStat) {
            if (!fsOperationFailed(stream, sourceFile, err)) {

                async.detect(sourcePaths,
                    detectSource(stream, sourceFile, targetStat),
                    function(results) {
                        if (results && results.length > 1) {
                            stream.push(sourceFile);
                        }
                        callback();
                    });
            } else {
                callback();
            }

        });
        // console.log('paths %j',laterpaths);
    };
}


module.exports = {
    compareToBlocks: function(root, blocklist) {
        var sourcePathMethod = getSourcePathsForBlocks(root, blocklist);
        return getCompareToMultiSources(sourcePathMethod);
    },
    compareToXSL: getCompareToMultiSources(getSourcePathsForAdjacentXSL),
    getCompareToMultiSources: getCompareToMultiSources

};
