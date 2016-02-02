'use strict';

var LessAutoprefixer = require('less-plugin-autoprefix'),
    path = require('path'),
    autoprefix;

function getPathsMethod(dir, folder) {
    return function getPaths(cPath) {
        var exclTest = cPath.substring(0, 1) === '!' ? '!' : '';
        if (exclTest === '!') cPath = cPath.substring(1);
        return path.join(exclTest + dir, folder, cPath);
    };
}


module.exports = function(gulp, plugins, config, utils, browserSync) {

    autoprefix = new LessAutoprefixer({
        browsers: config.browserList
    });

    function compileCss(src, name, dest) {
        // plugins.util.log(src, name, dest);

        return gulp.src(src, {
                base: '.'
            })
            .pipe(plugins.plumber())
            .pipe(plugins.cached(name))
            .pipe(utils.debugPipe({
                title: name
            })())
            .pipe(plugins.remember(name))
            .pipe(utils.sourcemaps.start())
            .pipe(plugins.concat(name))
            .pipe(plugins.less({
                plugins: [autoprefix]
            }))
            .pipe(plugins.minifyCss())
            .pipe(utils.sourcemaps.end())
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream());
    }

    function compileByGlob(src, name, dest) {
        return function() {
            return compileCss(src, name, dest);
        };
    }

    function compileByFolder(dir, src, dest) {
        return plugins.folders(dir, function(folder) {
            // console.log(paths.blocks.styles.buildPriority);
            var paths = src.map(getPathsMethod(dir, folder));
            return compileCss(paths, 'blocks.' + folder + '.css', dest);
        });
    }

    function exportCss(dir, src, dest) {
        return plugins.folders(dir, function(folder) {
            var paths = src.map(getPathsMethod(dir, folder));
            return gulp.src(paths)
                .pipe(plugins.plumber())
                .pipe(plugins.concat(folder + '.less'))
                .pipe(gulp.dest(path.join(dest, 'less', folder)));
        });
    }

    return {
        compileCss: compileCss,
        compileByGlob: compileByGlob,
        compileByFolder: compileByFolder,
        export: exportCss
    };

};
