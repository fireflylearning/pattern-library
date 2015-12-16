'use strict';

var gulp = require('gulp');

var gutil = require('gulp-util'),
    path = require('path'),
    del = require('del'),
    _ = require('lodash-node'),
    lazypipe = require('lazypipe'),
    LessAutoprefixer = require('less-plugin-autoprefix'),

    webpack = require('webpack'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    }),
    saxon = require('./lib/node_modules/gulp-saxon'),
    applyTemplate = require('./lib/node_modules/gulp-apply-template'),
    paths = require('./config/paths.js'),
    getWebpackConfig = require('./config/webpack.js'),
    siteConfigData = require('./config/crate.js'),
    options = require('./config/options.default.js'),
    gulpicon = require("./node_modules/gulpicon/tasks/gulpicon"),
    gulpiconConfig = require('./config/icons.js'),
    glob = require('glob'),

    root = path.join(__dirname),

    changedHandlers = require('./lib/gulp-changed-handlers'),
    templatePathUtils = require('./lib/template-path-utils')(root, paths.crate.layout.base),
    crateCssOut = 'crate.min.css';

var isDebugging,
    debugPipe,
    isProduction,
    exportPath,
    sourceMapsStart,
    sourceMapsEnd,
    browserSync,
    devJsCompiler,
    exportJsCompiler,
    webpackConfig,
    site = _.merge({}, siteConfigData, {
        blocks: [],
        pages: []
    }),
    locals = {};

try {
    locals = require('./config/options.local.js');
} catch (e) {}

var options = _.defaults(locals, options);

isDebugging = options.isDebugging;
isProduction = options.isProduction;
exportPath = options.exportPath || paths.export;

var autoprefix = new LessAutoprefixer({
    browsers: options.browserList
});

var fileinfo = require('./lib/fileinfo-utils')(site, root);

if (isDebugging) {
    debugPipe = function(debugOpts) {
        return lazypipe()
            .pipe(plugins.debug, debugOpts)
            .pipe(plugins.size, debugOpts);
    };
} else {
    debugPipe = function(debugOpts) {
        return lazypipe()
            .pipe(gutil.noop);
    };
}


if (isProduction) {
    sourceMapsStart = sourceMapsEnd = lazypipe()
        .pipe(gutil.noop);
} else {
    sourceMapsStart = lazypipe()
        .pipe(plugins.sourcemaps.init);
    sourceMapsEnd = lazypipe()
        .pipe(plugins.sourcemaps.write, './');
}

browserSync = require('browser-sync').create();
webpackConfig = getWebpackConfig(paths, options);
devJsCompiler = webpack(webpackConfig);
exportJsCompiler = webpack({
    entry: {
        blocks: './.tmp/js/blocks-export.js'
    },
    cache: false,
    output: {
        path: path.join(exportPath,'js'),
        filename: '[name].js',
        library: 'ffBlocks',
        libraryTarget: 'var'
    },
    resolve: {
        modulesDirectories: ['./node_modules', 'src', './blocks'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            React: 'react',
            _: 'lodash'
        })
    ],
    externals: {
        jquery: 'jQuery',
        react: 'React',
        'react/addons': 'React',
        lodash: '_'
    }
});

function camelCase(input) {
    return input.toLowerCase().replace(/[-_]+(.)?/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

var errorHandler = isDebugging ? function(err) {
    gutil.beep();
    console.log(err);
} : plugins.notify.onError({
    message: '<%= error.message %>',
    title: 'Error'
});

var errorPipe = lazypipe()
    .pipe(plugins.plumber, {
        errorHandler: errorHandler
    });

var fmPipe = lazypipe()
    .pipe(plugins.frontMatter, {
        property: 'data',
        remove: true
    });


var statsPipe = lazypipe()
    .pipe(plugins.tap, function(file) {
        console.log('%j', file);
    });


function changeEvent(name) {
    return function(evt) {
        gutil.log(name, 'file', '\'' + gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + paths.blocks.base + ')/'), '')) + '\'', 'was', gutil.colors.magenta(evt.type));
    };
}

function buildCss(src, name, dest) {
    return gulp.src(src, {
            base: '.'
        })
        .pipe(errorPipe())
        .pipe(plugins.cached(name))
        .pipe(debugPipe({
            title: name
        })())
        .pipe(sourceMapsStart())
        .pipe(plugins.remember(name))
        .pipe(plugins.concat(name))
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.minifyCss())
        .pipe(sourceMapsEnd())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}



function getTemplateFileContext(file) {
    return _.merge({}, file.data, {
        cache: false
    });
}




function generateContent(ext, doCache) {
    doCache = doCache === undefined ? true : doCache;
    return gulp.src(paths.crate.content.src)
        .pipe(errorPipe())
        .pipe(fmPipe())
        .pipe(plugins.markdown())
        .pipe(plugins.data(fileinfo.getDataForPages))
        .pipe(plugins.data(fileinfo.getFileRequires))
        .pipe(plugins.if(doCache, plugins.changed(paths.crate.content.dest, {
            extension: ext,
            hasChanged: changedHandlers.compareToBlocks(root, site.blocks)
        })))
        .pipe(debugPipe({
            title: 'generate:content:' + ext
        })())
        .pipe(applyTemplate({
            engine: 'swig',
            template: function(context) {
                return templatePathUtils.getContentLayoutRootPath(context.page.layout, ext); // typically, page-view
            },
            context: getTemplateFileContext
        }))
        .pipe(plugins.rename({
            extname: ext
        }))
        .pipe(gulp.dest(paths.crate.content.dest));
}


function generateBlocks(src, dest, ext, doCache, view) {
    doCache = doCache === undefined ? true : doCache;
    view = view || 'block-view';
    return gulp.src(src)
        .pipe(errorPipe())
        .pipe(plugins.if(doCache, plugins.changed(dest, {
            extension: ext,
            hasChanged: changedHandlers.compareToAdjacentSrcs(['.xml', '.xsl', '.md'])
        })))
        .pipe(debugPipe({
            title: 'generate:blocks:' + ext
        })())
        .pipe(plugins.data(fileinfo.getDataForBlocks))
        .pipe(plugins.data(fileinfo.getFileRequires))
        .pipe(applyTemplate({
            engine: 'swig',
            template: templatePathUtils.getBlockLayoutRootPath(view, ext),
            context: getTemplateFileContext
        }))
        .pipe(plugins.rename({
            extname: ext
        }))
        .pipe(gulp.dest(dest));
}




function runxslt() {
    var xslProcTemp = paths.temp;
    var xmlSrc = [xslProcTemp + 'blocks/**/*.xml', xslProcTemp + 'index.xml', xslProcTemp + 'pages/**/*.xml'];

    return gulp.src(xmlSrc, {
            base: xslProcTemp
        })
        .pipe(errorPipe())
        // .pipe(plugins.changed(paths.dest, {hasChanged: plugins.changed.compareSha1Digest}))
        .pipe(plugins.changed(paths.dest, {
            extension: '.html',
            hasChanged: changedHandlers.compareToAdjacentSrcs(['.xml', '.xsl'])
        }))
        .pipe(debugPipe({
            title: 'xslt'
        })())
        .pipe(saxon({
            jarPath: root + '/lib/saxon9he.jar',
            xslPath: function(file) {
                return gutil.replaceExtension(file.path, '.xsl');
            },
            outputType: '.html',
            timeout: 5000
        }))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
}


gulp.task('info:blocks', function() {
    site.blocks.length = 0; // clear whilst maintaining ref

    return gulp.src(paths.blocks.md.src)
        .pipe(errorPipe())
        .pipe(plugins.cached('blocks'))
        .pipe(debugPipe({
            title: 'info:blocks'
        })())
        .pipe(fmPipe())
        .pipe(plugins.markdown())
        .pipe(plugins.remember('blocks'))
        .pipe(plugins.tap(function(file) {
            var fmData = file.data;
            var fileInfo = fileinfo.getFileInfo(file);
            var pageData = fmData.page ? fmData.page : {
                title: fileInfo.basename
            };
            var blockData = fmData.data ? [].concat(fmData.data) : [];
            var block = [{}];
            block[0][fileInfo.basename] = blockData;
            var requires = fmData.requires ? _.uniq([].concat(fmData.requires)) : [];
            requires = _.filter(requires, function(req) {
                return req !== fileInfo.basename;
            });

            var mergeData = {
                site: siteConfigData,
                info: fileInfo,
                page: pageData,
                requires: requires,
                contents: file.contents
            };

            mergeData.page.blocks = fileinfo.normaliseBlocks(block, [mergeData], ['info']);
            site.blocks.push(mergeData);
        }));
});


gulp.task('info:content', ['info:blocks'], function() {
    site.pages.length = 0; // clear whilst maintaining ref
    return gulp.src(paths.crate.content.src, {
            base: '.'
        })
        .pipe(errorPipe())
        .pipe(plugins.cached('content'))
        .pipe(debugPipe({
            title: 'info:content'
        })())
        .pipe(fmPipe())
        .pipe(plugins.remember('content'))
        .pipe(plugins.tap(function(file) {
            var fmData = file.data;

            var fileInfo = fileinfo.getFileInfo(file, path.join(root, paths.crate.content.base));
            var pageData = fmData.page ? fmData.page : {
                title: fileInfo.basename
            };
            var blockData = fmData.data ? [].concat(fmData.data) : [];

            var mergeData = {
                site: siteConfigData,
                info: fileInfo,
                page: pageData,
            };

            var nBlocks = fileinfo.normaliseBlocks(blockData, site.blocks, ['info', 'requires']);
            var nReqs = _.uniq(_.reduce(nBlocks, function(total, block) {
                return total.concat(block.requires);
            }, []));

            nReqs = _.filter(nReqs, function(req) {
                return !_.some(nBlocks, function(block) {
                    return block.info.basename === req;
                });
            });

            mergeData.page.blocks = nBlocks;
            mergeData.requires = nReqs;
            site.pages.push(mergeData);
        }));
});


gulp.task('build:reactrt', function() {
    gulp.src(paths.blocks.rt.src)
        .pipe(plugins.reactTemplates({
            modules: 'commonjs'
        }))
        .pipe(plugins.rename({
            prefix: '_'
        }))
        .pipe(gulp.dest(paths.blocks.rt.dest));
});

gulp.task('build:css:blocks', plugins.folders(paths.blocks.base, function(folder) {
    var lPaths = paths.blocks.styles.buildPriority.map(function(cPath) {
        return path.join(paths.blocks.base, folder, cPath);
    });
    return buildCss(lPaths, 'blocks.' + folder + '.css', paths.blocks.styles.dest);
}));


gulp.task('build:css:crate', function() {
    return buildCss(paths.crate.styles.src, crateCssOut, paths.crate.styles.dest);
});



gulp.task('generate:blocks:xsl', ['info'], function() {
    return generateBlocks(paths.blocks.xsl.src, paths.blocks.xsl.dest, '.xsl');
});

gulp.task('generate:blocks:xsl:nocache', ['info'], function() {
    return generateBlocks(paths.blocks.xsl.src, paths.blocks.xsl.dest, '.xsl', false);
});



gulp.task('generate:blocks:xml', ['info'], function() {
    return generateBlocks(paths.blocks.xml.src, paths.blocks.xml.dest, '.xml');
});

gulp.task('generate:blocks:xml:nocache', ['info'], function() {
    return generateBlocks(paths.blocks.xml.src, paths.blocks.xml.dest, '.xml', false);
});



gulp.task('generate:content:xml', ['info'], function() {
    return generateContent('.xml');
});

gulp.task('generate:content:xml:nocache', ['info'], function() {
    return generateContent('.xml', false);
});

gulp.task('generate:content:xsl', ['info'], function() {
    return generateContent('.xsl');
});

gulp.task('generate:content:xsl:nocache', ['info'], function() {
    return generateContent('.xsl', false);
});

gulp.task('clean', function() {
    return del([exportPath].concat(paths.clean));
});


gulp.task('xslt', ['content', 'blocks'], runxslt);
gulp.task('watchxslt', runxslt);
gulp.task('xslt:nocache', ['content:nocache', 'blocks:nocache'], runxslt);

//TODO: Get working
gulp.task('audit', ['xslt'], function() {
    return gulp.src(paths.dest)
        // .pipe(debugPipe())
        .pipe(plugins.a11y())
        .pipe(plugins.a11y.reporter());
    // .pipe(plugins.rename('test.txt'))
    // .pipe(gulp.dest('.tests/wcag'));
});

gulp.task('optimise_svgs', function () {
    return gulp.src(paths.optimise_svgs.src)
        .pipe(plugins.svgmin())
        .pipe(gulp.dest(paths.optimise_svgs.dest));
});

gulp.task("icons",['optimise_svgs'], gulpicon(glob.sync(paths.icons.src), gulpiconConfig));

gulp.task('csslint', ['styles'], function() {
    gulp.src(paths.lint.styles)
        .pipe(plugins.csslint())
        .pipe(plugins.csslint.reporter());
});

gulp.task('jshint', ['scripts'], function() {
    gulp.src(paths.lint.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter());
});

gulp.task('assets', function() {
    return gulp.src(paths.assets.src)
        .pipe(plugins.cached('assets'))
        .pipe(debugPipe({
            title: 'assets'
        })())
        .pipe(errorPipe())
        .pipe(gulp.dest(paths.assets.dest))
        .pipe(browserSync.stream());
});


gulp.task('docs', function() {
    gulp.src('./docs/**/*.md')
        .pipe(debugPipe({
            title: 'docs'
        })())
        .pipe(plugins.markdown())
        .pipe(gulp.dest(path.join(paths.dest, 'docs')));
});

gulp.task('webpack', ['build:reactrt'], function(callback) {
    devJsCompiler.run(function(err, stats) {

        if (err) return callback(err);
        if (isDebugging) {
            gutil.log('[webpack]', stats.toString({
                colors: true
            }));
        }

        callback();
    });
});

gulp.task('serve', ['build'], function() {
    browserSync.init(options.browserSync);
});

gulp.task('watch', function() {

    gulp.watch([
            paths.assets.src
        ], ['watch:assets'])
        .on('change', changeEvent('Assets'));

    gulp.watch([
            paths.blocks.scripts.src
        ], ['watch:scripts'])
        .on('change', changeEvent('Scripts'));

    gulp.watch([
            paths.crate.styles.src
        ], ['watch:styles:crate'])
        .on('change', changeEvent('Styles:crate'));

    gulp.watch([
            paths.blocks.styles.src,
        ], ['watch:styles:blocks'])
        .on('change', changeEvent('Styles:block'));

    gulp.watch([
            paths.crate.content.src
        ], ['watch:content'])
        .on('change', changeEvent('Content'));

    gulp.watch([
            paths.crate.layout.base + 'src/pages/**/*.*',
            paths.crate.layout.base + 'src/includes/**/*.*'
        ], ['watch:content:layout'])
        .on('change', changeEvent('Layout:content '));

    gulp.watch([
            paths.crate.layout.base + 'src/blocks/**/*.*',
            paths.crate.layout.base + 'src/includes/**/*.*'
        ], ['watch:blocks:layout'])
        .on('change', changeEvent('Layout:blocks'));

    gulp.watch([
            paths.blocks.md.src,
        ], ['watch:blocks:md', 'watch:content'])
        .on('change', changeEvent('Blocks:md'));

    gulp.watch([
            paths.blocks.xml.src
        ], ['watch:blocks:xml', 'watch:content'])
        .on('change', changeEvent('Blocks:xml'));

    gulp.watch([
            paths.blocks.xsl.src
        ], ['watch:blocks:xsl', 'watch:content'])
        .on('change', changeEvent('Blocks:xsl'));

    gulp.watch([
            paths.temp + '**/*',
        ], ['watch:xslt'])
        .on('change', changeEvent('Xslt'));

    gulp.watch([
            paths.blocks.rt.src
        ], ['watch:reactrt'])
        .on('change', changeEvent('ReactRt:xsl'));
});

gulp.task('export:blocks', ['info'], function() {
    return gulp.src(paths.blocks.xsl.src)
        .pipe(plugins.concat('blocks.xsl'))
        .pipe(plugins.replace('ext:node-set', 'msxsl:node-set'))
        .pipe(applyTemplate({
            engine: 'swig',
            template: './crate/layout/export/blocks/main.xsl',
            context: getTemplateFileContext
        }))
        .pipe(gulp.dest(exportPath));
});


gulp.task('export:less', plugins.folders(paths.blocks.base, function(folder) {
    var lPaths = paths.blocks.styles.exportPriority.map(function(cPath) {
        return path.join(paths.blocks.base, folder, cPath);
    });

    return gulp.src(lPaths)
        .pipe(plugins.concat(folder + '.less'))
        .pipe(gulp.dest(path.join(exportPath, folder, 'less')));
}));

gulp.task('export:js', ['export:js:one'], function(callback) {
    exportJsCompiler.run(function(err, stats) {
        if (err) return callback(err);
        if (isDebugging) {
            gutil.log('[webpack]', stats.toString({
                colors: true
            }));
        }

        callback();
    });
});

gulp.task('export:js:one', function() {
    return gulp.src([
            paths.blocks.base + '**/[^_]*.js',
            '!'+paths.blocks.base + '**/{index,utils}.js'])
            .pipe(applyTemplate({
            engine: 'swig',
            template: './crate/layout/export/js/main.js',
            context: function(file) {
                var baseName = path.basename(file.path, '.js');
                var name = camelCase(baseName).replace('.', '_');
                var filePath = path.relative(path.join(root, './.tmp/js'), file.path);
                console.log(name, filePath);
                return {
                    varName: name,
                    filePath: filePath
                };
            }
        }))
        .pipe(plugins.concat(path.join('blocks-export.js')))
        .pipe(gulp.dest(path.join('./.tmp/js')));

});

gulp.task('export', ['export:blocks', 'export:less', 'export:js']);

gulp.task('output:site:pages', ['info:content', 'info:blocks'], function(cb) {
    console.log(gutil.colors.dim('%j'), site.pages);
    cb();
});

gulp.task('output:site:blocks', ['info:blocks'], function(cb) {
    console.log(gutil.colors.dim('%j'), site.blocks);
    cb();
});


gulp.task('info', ['info:blocks', 'info:content']);

gulp.task('styles', ['build:css:blocks', 'build:css:crate']);
gulp.task('scripts', ['webpack']);

gulp.task('blocks', ['generate:blocks:xsl', 'generate:blocks:xml']);
gulp.task('blocks:nocache', ['generate:blocks:xsl:nocache', 'generate:blocks:xml:nocache']);
gulp.task('content', ['generate:content:xml', 'generate:content:xsl']);
gulp.task('content:nocache', ['generate:content:xml:nocache', 'generate:content:xsl:nocache']);

gulp.task('build', ['xslt', 'styles', 'assets', 'build:reactrt','webpack','icons']);

gulp.task('watch:assets', ['assets']);
gulp.task('watch:info:blocks', ['info:blocks']);
gulp.task('watch:info:content', ['info:content']);

gulp.task('watch:styles:blocks', ['build:css:blocks']);
gulp.task('watch:styles:crate', ['build:css:crate']);

gulp.task('watch:scripts', ['scripts'], function(callback) {
    browserSync.reload('*.js');
    callback();
});

gulp.task('watch:content', ['xslt']);

gulp.task('watch:blocks:md', ['xslt']);
gulp.task('watch:blocks:xml', ['xslt']);
gulp.task('watch:blocks:xsl', ['xslt']);

gulp.task('watch:blocks:layout', ['xslt:nocache']);
gulp.task('watch:content:layout', ['xslt:nocache']);

gulp.task('watch:xslt', ['watchxslt']);

gulp.task('watch:reactrt', ['build:reactrt']);

gulp.task('dev', ['serve', 'watch']);
gulp.task('default', ['dev']);
