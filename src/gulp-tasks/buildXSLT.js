'use strict';

var mdtoXSLT = require('../gulp-plugins/gulp-mdtoXSLT')

module.exports = function(gulp, plugins) {

    function mdToXSLT(src, mdtoXSLTOptions, dest) {
        return function() {
            return gulp.src(src)
                .pipe(plugins.plumber({
                    errorHandler: function(err) {
                        console.log(err);
                    }
                }))
                .pipe(plugins.frontMatter({
                    property: 'data',
                    remove: true
                }))
                .pipe(plugins.markdown())
                .pipe(mdtoXSLT(mdtoXSLTOptions))
                .pipe(plugins.rename({
                    extname: '.html'
                }))
                .pipe(gulp.dest(dest));
        };
    }

    return mdToXSLT;


};
