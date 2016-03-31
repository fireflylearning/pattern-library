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
    return false;
}

function checkIsBlock(dirPath, cb) {
    var hasFiles, hasSubDirs, directAncestorFiles = [],
        isBlock = false;

    dir.paths(dirPath, function(err, paths) {
        if (err) return cb(false);
        hasFiles = paths.files.length > 0;
        hasSubDirs = paths.dirs.length > 0;

        if (hasFiles) {
            if (!hasSubDirs) {
                directAncestorFiles = paths.files;
            } else {
                directAncestorFiles = _.reduce(paths.files, function(result, file, key) {
                    var test = file.replace(dirPath + path.sep, '').split(path.sep);
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
}

module.exports = function(gulp, plugins) {
    return {
        blocks: {
            generateFileUrl: function generateFileUrl(name, resolvedName) {
                var ext = path.parse(resolvedName).ext;
                return plugins.util.replaceExtension(path.sep + resolvedName, '.html#' + ext);
            },
            generateBlockUrl: function generateBlockUrl(name, resolvedName) {
                return path.sep + path.join(resolvedName, name + '.html');
            },
            filterDir: function filterBlockDir(dirPath, cb) {
                var isHidden = checkFilenameHidden(dirPath);

                if (isHidden) return cb(false);
                checkIsBlock(dirPath, cb);
            },
            filterFile: function filterBlockFile(filePath, cb) {
                cb(true);
            }
        },
        pages: {
            generateFileUrl: function generateFileUrl(name, resolvedName) {
                return plugins.util.replaceExtension(resolvedName.replace('pages', ''), '.html');
            },
            filterFile: function filterPageFile(filePath, cb) {
                return cb(checkForMdFiles(filePath));
            }
        }
    };
};
