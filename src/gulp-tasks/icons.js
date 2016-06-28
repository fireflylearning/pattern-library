'use strict';

var path = require('path'),
    gulpicon = require('../../node_modules/gulpicon/tasks/gulpicon'),
    glob = require('glob'),
    folderTaskParallel = require('../lib/perFolderUtils').folderParallel;

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

module.exports = function(gulp, plugins, config, utils) {

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

    var iconsChanged = {};

    function getCheckModifiedMethod(src, srcDir, dest, destDir) {
        return plugins.folders(srcDir,
            function checkModified(folder) {
                var srcPaths = [].concat(src).map(function(cPath) {
                    return path.join(srcDir, folder, cPath);
                }).join();

                var destPath = path.join(destDir, dest);
                var changedPath = path.join(destPath, 'png/' + folder + '/');
                iconsChanged[folder] = [];

                return gulp.src(srcPaths)
                    .pipe(plugins.plumber())
                    .pipe(plugins.rename(function(path) {
                        var tmp = path.basename.split('.colors-');
                        var newpath = path.basename;
                        if (tmp.length > 1) {
                            newpath = tmp[0];
                            // console.log(' has-colours', tmp[1]);
                            tmp = tmp[1].split('-');
                            newpath = newpath + '-' + tmp[tmp.length - 1];
                            // console.log(main);
                        }
                        // console.log(path.basename, newpath);
                        path.basename = newpath; // Hack to account for gulpicon only renaming '.color' filenames
                    }))
                    .pipe(plugins.changed(changedPath, {
                        extension: '.png'
                    }))
                    .pipe(utils.debugPipe({
                        title: 'icons:checkmodified:' + folder
                    })())
                    .pipe(plugins.tap(function(file) {
                        iconsChanged[folder].push(file);
                    }));
            });
    }


    function getGrumpIcon(src, srcDir, dest, destDir) {
        return folderTaskParallel(srcDir, function(folder) {
            var haventChanged = iconsChanged[folder] && iconsChanged[folder].length === 0;

            plugins.util.log('Icons for ' + folder + (haventChanged ? ' haven\'t ' : ' have ') + 'changed');

            if (haventChanged) return function(cb) {
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
        copyIcons: getCopyMethod,
        export: getExportMethod,
        grumpIcon: getGrumpIcon
    };

};
