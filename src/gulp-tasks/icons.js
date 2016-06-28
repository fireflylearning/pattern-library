'use strict';

var path = require('path'),
    gulpicon = require('../../node_modules/gulpicon/tasks/gulpicon'),
    glob = require('glob'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    async = require('async'),
    path = require('path'),
    folderTaskSeries = require('../lib/perFolderUtils').folderSeries;

function updateIconConfig(iconConfig, folder) {
    var config = Object.create(iconConfig);
    config.datasvgcss = 'icons.' + folder + '.svg.css';
    config.datapngcss = 'icons.' + folder + '.png.css';
    config.urlpngcss = 'icons.' + folder + '.fallback.css';
    config.pngfolder = 'png/' + folder + '/';
    config.previewhtml = 'preview.' + folder + '.html';
    config.tmpDir = 'grunticon-tmp-' + folder;
    config.colors = (iconConfig.colors && iconConfig.colors[folder]) || {};
    config.customselectors = (iconConfig.customselectors && iconConfig.customselectors[folder]) || {};

    return config;
}

// ignore missing file error
function fsOperationFailed(stream, sourceFile, err) {
    if (err) {
        if (err.code !== 'ENOENT') {
            stream.emit('error', new gutil.PluginError('gulp-changed', err, {
                fileName: sourceFile.path
            }));
        }
    }

    return err;
}

module.exports = function(gulp, plugins, config, utils) {

    var iconsChanged = {};
    var configHasntChanged = [];

    function checkIconsHaventChanged(folder) {
        return iconsChanged[folder] && iconsChanged[folder].length === 0;
    }

    function checkConfigHasntChanged() {
        return configHasntChanged.length === 0;
    }

    function getCopyMethod(src, dest) {
        return function copyIcons() {
            return gulp.src(src)
                .pipe(plugins.plumber())
                .pipe(plugins.changed(dest))
                .pipe(utils.debugPipe({
                    title: 'icons:copying'
                })())
                .pipe(gulp.dest(dest));
        };
    }

    function getExportMethod(src, dest) {
        return function() {
            return gulp.src(src)
                .pipe(utils.debugPipe({
                    title: 'icons:exporting'
                })())
                .pipe(gulp.dest(dest));
        };
    }

    function getOptimiseMethod(src, srcDir, dest, destDir) {
        return plugins.folders(srcDir,
            function optimiseIcons(folder) {
                var srcPaths = [].concat(src).map(function(cPath) {
                    return path.join(srcDir, folder, cPath);
                });
                var destPath = path.join(destDir, folder, dest);

                // console.log(srcPaths);

                return gulp.src(srcPaths)
                    .pipe(plugins.plumber())
                    .pipe(plugins.changed(destPath))
                    .pipe(utils.debugPipe({
                        title: 'icons:optimise:' + folder
                    })())
                    .pipe(plugins.svgmin())
                    .pipe(gulp.dest(destPath));
            });
    }

    function getCheckModifiedMethod(src, srcDir, dest, destDir) {
        return plugins.folders(srcDir,
            function checkModified(folder) {
                var srcPaths = [].concat(src).map(function(cPath) {
                    return path.join(srcDir, folder, cPath);
                }).join();

                var destPath = path.join(destDir, dest);
                var changedPath = path.join(destPath, 'png', folder + '/');
                iconsChanged[folder] = [];

                return gulp.src(srcPaths)
                    .pipe(plugins.plumber())
                    .pipe(plugins.changed(changedPath, {
                        extension: '.png',
                        hasChanged: function(stream, cb, sourceFile, targetPath) {

                            var targetPaths = [],
                                targetPathInfo = path.parse(targetPath),
                                sourcePathInfo = path.parse(sourceFile.path);

                            var tmp = sourcePathInfo.base.split('.colors-');

                            if (tmp.length > 1) {
                                var firstPathPart = tmp[0];
                                var colors = tmp[1].replace(sourcePathInfo.ext, '').split('-');

                                targetPaths.push(path.join(targetPathInfo.dir, firstPathPart + targetPathInfo.ext));

                                colors.forEach(function(color) {
                                    targetPaths.push(path.join(targetPathInfo.dir, firstPathPart + '-' + color + targetPathInfo.ext));
                                });
                            } else {
                                targetPaths.push(targetPath);
                            }

                            async.filter(targetPaths, function(targetPath, _cb) {
                                fs.stat(targetPath, function(err, targetStat) {
                                    var fileExists = !fsOperationFailed(stream, sourceFile, err);
                                    if (!fileExists || fileExists && (sourceFile.stat.mtime > targetStat.mtime)) {
                                        return _cb(true);
                                    }
                                    return _cb(false);
                                });
                            }, function(results) {
                                if (results.length > 0) stream.push(sourceFile);
                                cb();
                            });
                        }
                    }))
                    .pipe(utils.debugPipe({
                        title: 'icons:checkmodified:' + folder
                    })())
                    .pipe(plugins.tap(function(file) {
                        iconsChanged[folder].push(file);
                    }));
            });
    }

    function getCheckConfigModified(src, dest) {

        configHasntChanged = [];

        return function() {
            return gulp.src(src)
                .pipe(plugins.plumber())
                .pipe(plugins.changed(dest))
                .pipe(utils.debugPipe({
                    title: 'icons:checkmodified:config'
                })())
                .pipe(plugins.tap(function(file) {
                    configHasntChanged.push(file);
                }))
                .pipe(gulp.dest(dest));
        };
    }

    function getGrumpIcon(src, srcDir, dest, destDir) {
        return folderTaskSeries(srcDir, function(folder) {
            var iconsHaventChanged = checkIconsHaventChanged(folder),
                configHasntChanged = checkConfigHasntChanged();

            plugins.util.log('[' + gutil.colors.magenta(folder.toUpperCase()) + '] Icons: ' + (iconsHaventChanged ? gutil.colors.green('NO CHANGE') : gutil.colors.red('CHANGED')));
            plugins.util.log('[' + gutil.colors.cyan('CONFIG') + '] Icons: ' + (configHasntChanged ? gutil.colors.green('NO CHANGE') : gutil.colors.red('CHANGED')));

            if (iconsHaventChanged && configHasntChanged) return function(cb) {
                cb();
            };

            var srcPaths = [].concat(src).map(function(cPath) {
                return path.join(srcDir, folder, cPath);
            }).join();

            var tempConfig = updateIconConfig(config.gulpicon, folder);
            tempConfig.dest = path.join(destDir, dest);

            return gulpicon(glob.sync(srcPaths), tempConfig);
        });

    }

    return {
        optimise: getOptimiseMethod,
        checkModified: getCheckModifiedMethod,
        checkConfigModified: getCheckConfigModified,
        copyIcons: getCopyMethod,
        export: getExportMethod,
        grumpIcon: getGrumpIcon
    };

};
