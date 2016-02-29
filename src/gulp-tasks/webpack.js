'use strict';

var webpack = require('webpack'),
    path = require('path'),
     _ = require('lodash');

function camelCase(input) {
    return input.toLowerCase().replace(/[-_]+(.)?/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

module.exports = function(gulp, plugins, config) {
    var compilers = {
        export: webpack(config.webpack.export),
        develop: webpack(config.webpack.develop)
    };

    function buildExportJs(dir, templatePath, tmpDir) {
        return function() {
            return gulp.src([
                    dir + '**/[^_]*.js',
                    '!' + dir + '**/{index,utils}.js'
                ])
                .pipe(plugins.plumber())
                .pipe(plugins.applyTemplate({
                    engine: 'swig',
                    template: templatePath,
                    context: function(file) {
                        var baseName = path.basename(file.path, '.js');
                        var name = camelCase(baseName).replace('.', '_');
                        var filePath = path.relative(path.join(process.cwd(), tmpDir), file.path);
                        // console.log(name, filePath);
                        return {
                            varName: name,
                            filePath: filePath
                        };
                    }
                }))
                .pipe(plugins.concat(path.join('blocks-export.js')))
                .pipe(gulp.dest(path.join('./.tmp/js')));
        };
    }

    function getCompiler(options, blockData) {

        return function(callback) {

            var entries = blockData.getJsEntries();
            entries = _.reduce(entries, function(result, entry) {
                var info = entry.getInfo();

                //TODO: make path more robust
                result[info.name.replace('.js', '')] = path.join(process.cwd(),info.absolutePath);
                return result;
            }, {});

            // console.log('ENRT', entries);
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
            console.log(config.webpack.develop.entry);
            return getCompiler(config.webpack.develop, blockData);
        },
        export: function() {
            return getExportCompiler(compilers.export);
        },
        buildExportJs: buildExportJs
    };
};
