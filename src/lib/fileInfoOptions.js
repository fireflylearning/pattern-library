'use strict';

var path = require('path'),
    _ = require('lodash'),
    dir = require('node-dir');

function checkFilenameHidden(testPath) {
    var dirTest = '_';
    return _.some(testPath.split(path.sep), function(part) {
        return part.charAt(0) === dirTest;
    });
}

function checkForMdFiles(testPath) {
    var fsInfo = path.parse(testPath);
    // console.log(fsInfo);
    if (fsInfo.ext === '.md') return true;
}

module.exports = function(gulp, plugins) {
    return {
        blocks: {
            generateFileUrl: function generateFileUrl(name, resolvedName) {
                var ext = path.parse(resolvedName).ext;
                return plugins.util.replaceExtension(path.sep + resolvedName, '.html#' + ext);
            },
            generateBlockUrl: function generateBlockUrl(name, resolvedName) {
                return path.sep + path.join(resolvedName, name + '.html')
            },
            filterDir: function filterBlockDir(dirPath, cb) {
                var isHidden = checkFilenameHidden(dirPath),
                    hasFiles, hasSubDirs, directAncestorFiles = [],
                    isBlock = false;

                if (isHidden) return cb(false);

                dir.paths(dirPath, function(err, paths) {
                    if (err) return cb(false);
                    // console.log('\n' + dirPath + '\n');
                    // console.log('files:\n', paths.files);
                    // console.log('subdirs:\n', paths.dirs);
                    hasFiles = paths.files.length > 0;
                    hasSubDirs = paths.dirs.length > 0;

                    if (hasFiles) {
                        if (!hasSubDirs) {
                            directAncestorFiles = paths.files;
                        } else {
                            directAncestorFiles = _.reduce(paths.files, function(result, file, key) {
                                var test = file.replace(dirPath + path.sep, '').split(path.sep);
                                // console.log(test.length);
                                if (test.length === 1) result.push(file);
                                return result;
                            }, []);
                        }
                    }

                    directAncestorFiles = _.chain(directAncestorFiles)
                        .reject(checkFilenameHidden)
                        .filter(checkForMdFiles)
                        .value();

                    isBlock = directAncestorFiles.length > 0;

                    cb(isBlock);
                });
            },
            filterFile: function filterBlockFile(filePath) {
                var pathTest = '_';
                var isHidden = _.some(filePath.split(path.sep), function(part) {
                    return part.charAt(0) === pathTest;
                })
                return !isHidden;
            }
        },
        pages: {
            generateFileUrl: function generateFileUrl(name, resolvedName) {
                return plugins.util.replaceExtension(resolvedName.replace('pages', ''), '.html');
            },
            filterFile: function filterPageFile(filePath) {
                var fsInfo = path.parse(filePath);
                if (fsInfo.ext === '.md') return true;
            }
        }
    }
}
