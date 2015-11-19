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
        var blocks = sourceFile.data.page.blocks || blocklist;
        var reqs = sourceFile.data.requires;
        // var sourcePathMethod = getSourcePathsForAdjacentSrcs(['.xsl', '.xml', '.yaml']);
        var sourcePaths = [];
        sourcePaths.push(gutil.replaceExtension(sourceFile.path, '.md'));

        if (blocks) {
            blocks.forEach(function(b) {
                var base = path.join(root, b.info.basepath);
                sourcePaths.push(base + '.xsl');
                sourcePaths.push(base + '.xml');
            });
        }

        if (reqs) {
            reqs.forEach(function(b) {
                var base = path.join(root, b.info.basepath);
                sourcePaths.push(base + '.xsl');
            });
        }
        // console.log(sourcePaths);
        return sourcePaths;
    };
}


function getSourcePathsForAdjacentSrcs(exts) {
    return function sourcePathsForAdjacentSrcs(sourceFile) {
        exts = [].concat(exts);
        var srcs = [];
        if (!exts.length) throw new Error('[gulp-changed-helpers] extensions must be array');
        exts.forEach(function(ext) {
            srcs.push(gutil.replaceExtension(sourceFile.path, ext));
        });
        return srcs;
    };
}

function getCompareToMultiSources(sourcePathMethod) {

    return function compareToMultiSources(stream, callback, sourceFile, targetPath) {

        var sourcePaths = sourcePathMethod(sourceFile);
        fs.stat(targetPath, function(err, targetStat) {
            if (!fsOperationFailed(stream, sourceFile, err)) {
                if (sourceFile.path.match(/index/)) {
                    stream.push(sourceFile);
                    callback();
                } else {
                    async.detect(sourcePaths,
                        detectSource(stream, sourceFile, targetStat),
                        function(results) {

                            if (results && results.length > 1) {
                                // console.log('   adding file %s', sourceFile.path);
                                stream.push(sourceFile);
                            }
                            callback();
                        });
                }

            } else {
                // console.log('   passing through %s', sourceFile.path);
                callback();
            }

        });
    };
}


module.exports = {
    compareToBlocks: function(root, blocklist) {
        var sourcePathMethod = getSourcePathsForBlocks(root, blocklist);
        return getCompareToMultiSources(sourcePathMethod);
    },
    compareToAdjacentSrcs: function(exts) {
        return getCompareToMultiSources(getSourcePathsForAdjacentSrcs(exts));
    },
    getCompareToMultiSources: getCompareToMultiSources

};
