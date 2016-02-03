'use strict';

var gulp = require('gulp'),
    child_process = require('child_process'),
    path = require('path'),
    bluebird = require('bluebird'),
    writeFile = bluebird.promisify(require('fs').writeFile),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    }),

    argv = require("minimist")(process.argv.slice(2)),
    config = require('./config')(argv),
    paths = config.paths,


    blockData = require('./src/lib/blockData')(),
    pageData = require('./src/lib/pageData')(),
    siteData = require('./src/lib/siteData')(config.site),
    swig = require('./src/lib/augmentedSwig')(blockData, pageData),

    buildXSLTBlockOptions = require('./src/lib/mdtoXSLTBlocks')(blockData, siteData, swig),
    buildXSLTPageOptions = require('./src/lib/mdtoXSLTPages')(pageData, blockData, siteData, swig),
    fileInfoOptions = require('./src/lib/fileInfoOptions')(gulp, plugins),
    getBlockInfo = require('./src/gulp-tasks/fileInfo').getBlockInfo,
    getFileInfo = require('./src/gulp-tasks/fileInfo').getFileInfo,
    buildXSLT = require('./src/gulp-tasks/buildXSLT')(gulp, plugins),
    exportBlocks = require('./src/gulp-tasks/exportBlocks')(gulp, plugins),
    server = require('./src/gulp-tasks/server')(gulp, plugins, config),
    browserSync = server.browserSync,
    utils = require('./src/lib/utils')(gulp, plugins, browserSync, config),
    cssTasks = require('./src/gulp-tasks/compileCSS')(gulp, plugins, config, utils, browserSync),
    reactTemplates = require('./src/gulp-tasks/reactTemplates')(gulp, plugins, config, utils, browserSync),
    webpackTasks = require('./src/gulp-tasks/webpack')(gulp, plugins, config),
    iconTasks = require('./src/gulp-tasks/icons')(gulp, plugins, config, utils),
    assetTasks = require('./src/gulp-tasks/assets')(gulp, plugins, config, utils, browserSync),
    clean = require('./src/gulp-tasks/clean')(gulp, plugins);


/**
 * Data
 * ******************************************/

/**
 * Compile block and page info for use in other build steps
 */
gulp.task('info:blocks',
    getBlockInfo('blocks/core', blockData, fileInfoOptions.blocks, config.site));

gulp.task('info:pages', ['info:blocks'],
    getFileInfo('pages/', pageData, fileInfoOptions.pages, config.site));

gulp.task('info', ['info:blocks', 'info:pages']);



/**
 * HTML/XSLT
 * ******************************************/

/**
 * Compile blocks and pages into html via xsl/xml
 */

gulp.task('xslt:pages', ['info'],
    buildXSLT(paths.pages.xslt.src, buildXSLTPageOptions, paths.pages.xslt.dest));

gulp.task('xslt:blocks', ['info'],
    buildXSLT(paths.blocks.xslt.src, buildXSLTBlockOptions, paths.blocks.xslt.dest));

gulp.task('xslt', ['xslt:blocks', 'xslt:pages']);

/**
 * Export blocks
 */
gulp.task('export:blocks',
    exportBlocks(paths.blocks.export.src, config.exportPath, './src/templates/export/blocks/main.xsl', 'blocks.xsl'));



/**
 * Css
 * ******************************************/

/**
 * Compile css
 */

gulp.task('css:blocks',
    cssTasks.compileByFolder(paths.blocks.dir, paths.blocks.styles.buildPriority, paths.blocks.styles.dest));

gulp.task('css:pages',
    cssTasks.compileByGlob(paths.pages.styles.src, config.pagesCssName, paths.pages.styles.dest));

gulp.task('css', ['css:blocks', 'css:pages']);


/**
 * Export Less
 */
gulp.task('export:less',
    cssTasks.export(paths.blocks.dir, paths.blocks.styles.exportPriority, config.exportPath));


/**
 * Javascript
 * ******************************************/

/**
 * Compile javascript
 */
gulp.task('js', ['react:templates'],
    webpackTasks.develop());


/**
 * Export javascript
 */
gulp.task('export:js', ['preexport:js'],
    webpackTasks.export());

gulp.task('preexport:js', ['react:templates'],
    webpackTasks.buildExportJs(paths.blocks.dir, './src/templates/export/js/main.js', './.tmp/js'));


/**
 * Compile React Templates
 */
gulp.task('react:templates', reactTemplates(paths.blocks.rt.src, paths.blocks.rt.dest));



/**
 * Icons
 * ******************************************/
/**
 * Generate icon css+fallbacks from svg files
 */
gulp.task('icons', ['icons:grump:copy']);

gulp.task('icons:copy',
    iconTasks.copyIcons(paths.icons.copy.src, paths.icons.copy.dest));

gulp.task('icons:grump:copy', ['icons:grumpicon'],
    iconTasks.copyIcons(paths.icons.copy.src, paths.icons.copy.dest));

gulp.task('icons:grumpicon', ['icons:checkmodified'],
    iconTasks.grumpIcon(paths.icons.grumpicon.src, paths.icons.grumpicon.srcDir, paths.icons.grumpicon.dest, paths.icons.grumpicon.destDir));

gulp.task('icons:checkmodified', ['icons:optimise'],
    iconTasks.checkModified(paths.icons.grumpicon.src, paths.icons.grumpicon.srcDir, paths.icons.grumpicon.dest, paths.icons.grumpicon.destDir));

gulp.task('icons:optimise',
    iconTasks.optimise(paths.icons.optimise.src, paths.icons.optimise.srcDir, paths.icons.optimise.dest, paths.icons.optimise.destDir));

/**
 * Export Icons
 */
gulp.task('export:icons', ['icons:grumpicon'],
    iconTasks.export(paths.icons.export.src, path.join(config.exportPath, 'icons')));



/**
 * Assets
 * ******************************************/
/**
 * Copy assets to development folder
 */
gulp.task('assets',
    assetTasks.develop(paths.assets.src, paths.assets.dest));

/**
 * Export assets
 */
gulp.task('export:assets',
    assetTasks.export(paths.assets.export, config.exportPath));

/**
 * Serve local files
 */
gulp.task('serve', ['build'], server.initBrowserSync());



/**
 * Watching
 *********************************************/
gulp.task('watch', ['build'], function(){

    gulp.watch([
            paths.assets.src
        ], ['watch:assets'])
        .on('change', utils.changeEvent('Assets'));

    gulp.watch([
            paths.blocks.scripts.src
        ], ['watch:js'])
        .on('change', utils.changeEvent('Js'));

    gulp.watch([
            paths.pages.styles.src
        ], ['watch:css:pages'])
        .on('change', utils.changeEvent('Styles:pages'));

    gulp.watch([
            paths.blocks.styles.watch,
        ], ['watch:css:blocks'])
        .on('change', utils.changeEvent('Styles:blocks'));

    gulp.watch([
            paths.icons.copy.src,
        ], ['watch:icons'])
        .on('change', utils.changeEvent('Icons'));

    gulp.watch([
            paths.blocks.rt.src
        ], ['watch:react:templates'])
        .on('change', utils.changeEvent('React Templates'));

    gulp.watch([
            paths.pages.watch
        ], ['watch:pages'])
        .on('change', utils.changeEvent('Pages'));

    gulp.watch([
            paths.pages.templates.watch
        ], ['watch:pages:templates'])
        .on('change', utils.changeEvent('Layout:content '));

    gulp.watch([
            paths.blocks.watch,
        ], ['watch:blocks'])
        .on('change', utils.changeEvent('Blocks'));

})


gulp.task('watch:assets', ['assets']);
gulp.task('watch:css:blocks', ['css:blocks']);
gulp.task('watch:css:pages', ['css:pages']);
gulp.task('watch:js', ['js'], utils.callbackAfterBuild('*.js'));
gulp.task('watch:icons', ['icons:copy']);
gulp.task('watch:react:templates', ['react:templates']);

gulp.task('watch:pages', ['xslt'], utils.callbackAfterBuild('*.html'));
gulp.task('watch:pages:templates', ['xslt'], utils.callbackAfterBuild('*.html'));
gulp.task('watch:blocks', ['xslt'], utils.callbackAfterBuild('*.html'));



/**
 * Combine html and css build
 */
gulp.task('build', ['xslt', 'css', 'assets', 'js', 'icons:copy']);



/**
 * Export
 *********************************************/
gulp.task('export', ['export:blocks', 'export:less', 'export:js', 'export:icons', 'export:assets'], function(cb) {
    gitCommit()
        .then(function(commit) {
            var info = {
                commit: commit
            };
            return writeFile(path.join(config.exportPath, "pattern-library.json"), JSON.stringify(info));
        })
        .asCallback(cb);
});

function gitCommit(callback) {
    return bluebird.resolve([
        exec("git rev-parse --verify HEAD"),
        exec("git status --porcelain")
    ]).spread(function(revParseResult, statusResult) {
        var commit = revParseResult.stdout.trim();
        var isDirty = /\S/.test(statusResult.stdout);
        return commit + (isDirty ? "-dirty" : "");
    });
}

function exec(command, options) {
    return bluebird.fromCallback(function(callback) {
        child_process.exec(command, options, function(error, stdout, stderr) {
            callback(error, {stdout: stdout, stderr: stderr});
        });
    });
}


/**
 * Clean
 *********************************************/
gulp.task('clean', clean([config.exportPath].concat(paths.clean)));



/**
 * Combined tasks
 *********************************************/

gulp.task('dev', ['serve', 'watch']);
gulp.task('default', ['dev']);
