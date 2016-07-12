'use strict';

var webpack = require('webpack'),
    path = require('path'),
    _ = require('lodash');

function camelCase(input) {
    return input.toLowerCase().replace(/[-_]+(.)?/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

function getSrc(dir) {
    return [
            dir + '**/**.js',               // match all js
            '!' + dir + "**/_*",            // except folders
            '!' + dir + "**/_*/**",         // or files with underscore
            '!' + dir + "lib_test/**/*",    // or anything in lib_test
            '!' + dir + "_lib/**/*"         // or anything in _lib
        ];
}

function getRawSrc(dir) {
    return [
            dir + '**/**.js',
            dir + '**/**.jsx',
            '!' + dir + "**/_*-{renderer,view,control,mock*}.js",
            '!' + dir + "lib_test/**/*",
        ];
}

module.exports = function(gulp, plugins, config, utils) {
    var compilers = {
        export: webpack(config.webpack.export),
        develop: webpack(config.webpack.develop)
    };

    function buildExportJs(dir, templatePath, tmpDir) {
        return function() {
            return gulp.src(getSrc(dir))
                .pipe(plugins.plumber())
                .pipe(plugins.applyTemplate({
                    engine: 'swig',
                    template: templatePath,
                    context: function(file) {
                        var baseName = path.basename(file.path, '.js');
                        var name = camelCase(baseName).replace('.', '_');
                        var filePath = path.relative(path.join(process.cwd(), tmpDir), file.path);

                        return {
                            varName: name,
                            filePath: filePath
                        };
                    }
                }))
                .pipe(plugins.concat(path.join('blocks-export.js')))
                .pipe(gulp.dest(path.join(tmpDir)));
        };
    }

    function buildExportRawJs(dir, dest) {
        return function() {
            return gulp.src(getRawSrc(dir))
                .pipe(plugins.plumber())
                .pipe(utils.debugPipe({
                    title: 'export:js:raw'
                })())
                .pipe(gulp.dest(path.join(dest, 'js/')));
            };
    }


    function getCompiler(options, blockData) {

        return function(callback) {

            var entries = blockData.getJsEntries();
            entries = _.reduce(entries, function(result, entry) {
                var info = entry.getInfo();

                //TODO: make path more robust
                result[info.name.replace('.js', '')] = [path.join(process.cwd(), info.absolutePath)]; //Needs to be array as workaround for https://github.com/webpack/webpack/issues/300
                return result;
            }, {});

            options.entry = entries;

            compilers.develop = webpack(options);

            compilers.develop.run(function(err, stats) {

                if (err) return callback(err);
                if (config.isDebugging) {
                    plugins.util.log('[webpack]', stats.toString({
                        colors: true
                    }));
                }

                callback();
            });
        };
    }

    function getExportCompiler(compiler) {
        return function(callback) {

            compiler.run(function(err, stats) {

                if (err) return callback(err);
                if (config.isDebugging) {
                    plugins.util.log('[webpack]', stats.toString({
                        colors: true
                    }));
                }

                callback();
            });
        };
    }

    return {
        develop: function(blockData) {
            return getCompiler(config.webpack.develop, blockData);
        },
        export: function() {
            return getExportCompiler(compilers.export);
        },
        buildExportJs: buildExportJs,
        buildExportRawJs: buildExportRawJs
    };
};
