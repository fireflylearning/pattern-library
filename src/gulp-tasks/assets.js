'use strict';

module.exports = function(gulp, plugins, config, utils, browserSync){

    function getExport(src, dest){
        return function() {
            return gulp.src(src)
                .pipe(gulp.dest(dest));
        };
    }


    function getDevelop(src, dest){
        return function() {
            return gulp.src(src)
                .pipe(plugins.plumber())
                .pipe(plugins.cached('assets'))
                .pipe(utils.debugPipe({
                    title: 'assets'
                })())
                .pipe(gulp.dest(dest))
                .pipe(browserSync.stream());
        };
    }


    return {
        develop: getDevelop,
        export: getExport
    };
};
