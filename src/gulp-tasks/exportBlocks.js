'use strict';
var _ = require('lodash-node');

module.exports = function(gulp, plugins) {
    return function getExportBlocks(src, dest, templatePath, fileName) {
        return function exportBlocks() {
            return gulp.src(src)
                .pipe(plugins.concat(fileName))
                .pipe(plugins.replace('ext:node-set', 'msxsl:node-set'))
                .pipe(plugins.applyTemplate({
                    engine: 'swig',
                    template: templatePath,
                    context: function getTemplateFileContext(file) {
                        return _.merge({}, file.data, {
                            cache: false
                        });
                    }
                }))
                .pipe(gulp.dest(dest));
        };
    };
}
