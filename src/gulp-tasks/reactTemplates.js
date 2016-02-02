'use strict';

module.exports = function(gulp, plugins, config, utils) {
    return function(src, dest) {
        return function() {
            gulp.src(src)
                .pipe(plugins.plumber())
                .pipe(plugins.cached('reactrt'))
                .pipe(utils.debugPipe({
                    title: 'build:reactrt'
                })())
                .pipe(plugins.reactTemplates({
                    modules: 'commonjs'
                }))
                .pipe(plugins.rename({
                    prefix: '_'
                }))
                .pipe(gulp.dest(dest));
        };
    };
};
