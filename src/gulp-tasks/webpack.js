'use strict';

var webpack = require('webpack'),
    path = require('path');

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
                .pipe(plugins.applyTemplate({
                    engine: 'swig',
                    template: templatePath,
                    context: function(file) {
                        var baseName = path.basename(file.path, '.js');
                        var name = camelCase(baseName).replace('.', '_');
                        var filePath = path.relative(path.join(process.cwd(), tmpDir), file.path);
                        console.log(name, filePath);
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

    function getCompiler(compiler) {

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
        develop: function() {
            return getCompiler(compilers.develop);
        },
        export: function() {
            return getCompiler(compilers.export);
        },
        buildExportJs: buildExportJs
    };
};
