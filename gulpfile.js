/* jshint node: true */
'use strict';

var gulp = require('gulp');

var es = require('event-stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    del = require('del'),
    async = require('async'),
    _ = require('lodash-node'),
    lazypipe = require('lazypipe'),
    LessAutoprefixer = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4']
    }),

    webpack = require('webpack'),
    swig = require('swig'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    }),
    saxon = require('./lib/node_modules/gulp-saxon'),
    applyTemplate = require('./lib/node_modules/gulp-apply-template'),
    paths = require('./config/paths.js'),
    webpackConfig = require('./config/webpack.js'),
    siteData = require('./config/crate.js'),
    options = require('./config/options.default.js');

var debugPipe,
    locals = {};

try {
    locals = require('./config/options.local.js');
} catch (e) {}

var options = _.defaults(locals, options);

if (options.debug) {
    debugPipe = lazypipe()
        .pipe(plugins.debug);
} else {
    debugPipe = lazypipe()
        .pipe(gutil.noop);
}

var browserSync = require('browser-sync').create();


var root = path.join(__dirname);

var blockCssOut = 'blocks.min.css',
    crateCssOut = 'crate.min.css';

var devCompiler = webpack(webpackConfig);


var errorPipe = lazypipe()
    .pipe(plugins.plumber, {
        errorHandler: function(err) {
            gutil.beep();
            console.log(err);
        }
    });
// .pipe(plugins.plumber, {
//     errorHandler: plugins.notify.onError({
//         message: '<%= error.message %>',
//         title: 'Error'
//     })
// });

var fmPipe = lazypipe()
    .pipe(plugins.frontMatter, {
        property: 'data',
        remove: true
    });

var reXML = lazypipe()
    .pipe(plugins.rename, {
        extname: '.xml'
    });

var reXSL = lazypipe()
    .pipe(plugins.rename, {
        extname: '.xsl'
    });

var fileDataPipe = lazypipe()
    .pipe(plugins.data, function(file) {
        return getFileSiteData(file);
    });

var preProcessPipe = lazypipe()
    .pipe(debugPipe)
    .pipe(fmPipe)
    .pipe(fileDataPipe);
// .pipe(plugins.markdown)
// .pipe(plugins.rename,{
//     extname: '.xml'
// });
// .pipe(plugins.swig);

var pageProc = lazypipe()
    .pipe(preProcessPipe)
    .pipe(plugins.data, function(file) {
        if (file.data && file.data.blocks) {
            file.data.blocks = normaliseBlocks(file.data.blocks);
        }
        // console.log('blocks: %j', file.data.blocks);
        return file.data;
    });

var defaultDataPipe = lazypipe()
    .pipe(plugins.tap, function(file) {
        // var basepath = path.relative(root, path.join(path.dirname(file.path), path.basename(file.path, path.extname(file.path))));
        var yamlPath = './' + gutil.replaceExtension(path.relative(root, file.path), '.yaml'),
            yamlFile;

        // console.log('\n[%s]\n[%s]\n', p, gutil.replaceExtension(file.path, '.json'));
        // console.log('\n[%s]\n', yamlPath);
        try {
            yamlFile = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
            file.data = _.merge(yamlFile, file.data);
        } catch (e) {
            gutil.log(gutil.colors.yellow('YAML File for', yamlPath, 'was not found'));
        }
        //
    });

var xslRootPipe = lazypipe()
    .pipe(plugins.data, function(file) {
        var xslProcTemp = paths.temp;
        var rel = path.relative(path.join(root, 'crate'), file.path);
        rel = path.join(root, xslProcTemp, rel);
        rel = gutil.replaceExtension(rel, '.xsl');
        // console.log('\n[%s]\n', rel);
        return _.merge(file.data, {
            xslPath: rel,
            xslRoot: path.join(root, xslProcTemp, '/')
        });
    });

function changeEvent(name) {
    return function(evt) {
        gutil.log(name, 'file', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + paths.blocks.base + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
    }
}


function buildCss(src, name, dest) {
    return gulp.src(src, {
            base: '.'
        })
        .pipe(errorPipe())
        .pipe(debugPipe())
        .pipe(plugins.concat(name))
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        // .pipe(isProduction ? plugins.combineMediaQueries({
        //     log: true
        // }) : gutil.noop())
        // .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.minifyCss())
        .pipe(plugins.size())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

function getBlockData(basename) {
    if (!blocklist) return null;
    if (!basename) return null;
    var blocknames = blocklist.filter(function(block) {
            return block.basename === basename;
        })
        .map(function(block) {
            return {
                basename: block.basename,
                path: block.path,
                basepath: block.basepath,
                link: block.link
            };
        });

    return blocknames.length ? blocknames[0] : null;
}

function normaliseBlocks(blocks) {
    if (!blocks) return [];
    var nb = [];

    blocks.forEach(function(block) {
        for (var name in block) {
            var bd = getBlockData(name);
            if (bd) {
                nb.push(_.merge(bd, {
                    contexts: [].concat(block[name])
                }));
            }
        }
    });
    return nb;
}

function getFileBaseData(file) {
    var ext = path.extname(file.path),
        dirname = path.dirname(file.path),
        basename = path.basename(file.path, ext),
        relpath = path.relative(root, file.path),
        basepath = path.relative(root, path.join(dirname, basename));

    return _.merge(file.data, {
        basename: basename,
        basepath: basepath,
        path: relpath,
        link: '/' + gutil.replaceExtension(relpath, '.html'),
        site: siteData,
        contents: (file.contents ? String(file.contents) : '')
    });
}

function getFileSiteData(file) {
    return _.merge(getFileBaseData(file), {
        blocklist: blocklist,
        filelist: filelist
    });
}

function getGenPath(name, ext, type) {
    ext = ext || '.xml';
    var layoutroot = path.join(root, paths.crate.layout.base, 'src', type);
    var layoutpath = layoutroot + '/' + name + ext;
    // console.log(layoutpath);
    return layoutpath;
}

function getContentGeneratorRootPath(layoutname, ext) {
    return getAbsPath(getGenPath(layoutname, ext, 'pages'));
}

function getBlockGeneratorRootPath(layoutname, ext) {
    return getAbsPath(getGenPath(layoutname, ext, 'blocks'));
}

function getAbsPath(layoutpath) {
    var p = path.relative(root, layoutpath);
    // console.log(p);
    return p;
}

function getFileContext(file) {
    return _.merge(file.data, {
        cache: false
    });
}



function fsOperationFailed(stream, sourceFile, err) {
    if (err) {
        if (err.code !== 'ENOENT') {
            stream.emit('error', new gutil.PluginError('gulp-changed', err, {
                fileName: sourceFile.path
            }));
        }
        stream.push(sourceFile);
    }
    return err;
}

function compareToBlocks(stream, callback, sourceFile, targetPath) {
    var blocks = sourceFile.data.blocks || blocklist;
    var sourcePaths = [];
    if (blocks) {
        blocks.forEach(function(b) {
            var base = path.join(root, b.basepath);
            sourcePaths.push(base + '.xsl');
            sourcePaths.push(base + '.xml');
            sourcePaths.push(sourceFile.path);
        });
    }
    // console.log(sourceFile.relative);

    fs.stat(targetPath, function(err, targetStat) {

        if (!fsOperationFailed(stream, sourceFile, err)) {

            async.detect(sourcePaths, function(sourcePath, cb) {

                fs.stat(sourcePath, function(err, sourceStat) {
                    var passthrough = false;
                    if (fsOperationFailed(stream, sourceFile, err)) {
                        passthrough = true;
                    } else {
                        if (sourceStat.mtime > targetStat.mtime) {
                            passthrough = true;
                        }
                    }
                    cb(passthrough);
                });
            }, function(results) {
                // console.log('   %j', results);
                if (results && results.length > 1) {
                    stream.push(sourceFile);
                }
                callback();
            });
        } else {
            callback();
        }



    });
    // console.log('paths %j',laterpaths);
}


var blocklist = [];
gulp.task('info:blocks', function() {
    blocklist = [];
    return gulp.src(paths.blocklist)
        .pipe(errorPipe())
        .pipe(debugPipe())
        .pipe(fmPipe())
        .pipe(defaultDataPipe())
        .pipe(plugins.tap(function(file) {
            blocklist.push(getFileBaseData(file));
        }));
});


var filelist = [];
gulp.task('info:files', function() {
    filelist = [];
    return gulp.src(paths.crate.content.src, {
            base: '.'
        })
        .pipe(errorPipe())
        .pipe(debugPipe())
        .pipe(fmPipe())
        // .pipe(reXML())
        .pipe(plugins.tap(function(file) {
            var fdata = getFileBaseData(file);
            var relpath = path.relative(path.join(root, paths.crate.content.base), file.path);
            if (fdata.basename !== 'index') {
                fdata = getFileBaseData(file);
                fdata.path = relpath; // overwriting to get path relative to crate
                fdata.link = path.join('/', gutil.replaceExtension(relpath, '.html'));
                filelist.push(fdata);
            }
        }));

});


gulp.task('output:info:files', ['info:files', 'info:blocks'], function(cb) {
    console.log('%j', filelist);
    cb();
});

gulp.task('output:info:blocks', ['info:blocks'], function(cb) {
    console.log('%j', blocklist);
    cb();
});



gulp.task('build:css:blocks', function() {
    return buildCss(paths.blocks.styles.src, blockCssOut, paths.blocks.styles.dest);
});


gulp.task('build:css:crate', function() {
    return buildCss(paths.crate.styles.src, crateCssOut, paths.crate.styles.dest);
});




gulp.task('generate:blocks:xsl', ['info'], function() {

    var xsl = gulp.src(paths.blocks.xsl.src);
    // .pipe(errorPipe());

    var merged = xsl
        .pipe(preProcessPipe())
        .pipe(xslRootPipe())
        .pipe(plugins.swig({
            defaults: {
                cache: false
            }
        }))
        .pipe(plugins.concat('all.xsl'))
        .pipe(plugins.wrap('<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ff_module="http://www.fireflylearning/module"><%= contents %></xsl:stylesheet>'));

    var wrapped = xsl
        .pipe(plugins.changed(paths.blocks.xsl.dest))
        .pipe(debugPipe())
        .pipe(fmPipe())
        .pipe(reXSL())
        .pipe(fileDataPipe())
        .pipe(xslRootPipe())
        .pipe(reXSL())
        // .pipe(plugins.tap(function(file) {
        //     console.log(file.data.path);
        // }))
        .pipe(applyTemplate({
            engine: 'swig',
            template: getBlockGeneratorRootPath('block-view', '.xsl'),
            context: getFileContext
        }));

    // return es.merge(merged, wrapped)
    return wrapped
        .pipe(gulp.dest(paths.blocks.xsl.dest));

});

gulp.task('generate:blocks:xml', ['info'], function() {

    return gulp.src(paths.blocks.xml.src)
        .pipe(errorPipe())
        .pipe(plugins.changed(paths.blocks.xml.dest))
        .pipe(preProcessPipe())
        .pipe(xslRootPipe())
        .pipe(defaultDataPipe())
        .pipe(applyTemplate({
            engine: 'swig',
            template: getBlockGeneratorRootPath('block-view', '.xml'),
            context: getFileContext
        }))
        .pipe(reXML())
        .pipe(gulp.dest(paths.blocks.xml.dest));
});

gulp.task('generate:pages:xml', ['info'], function() {

    return gulp.src(paths.crate.content.src)
        .pipe(errorPipe())
        .pipe(pageProc())
        .pipe(plugins.changed(paths.crate.content.dest, {
            extension: '.xml',
            hasChanged: compareToBlocks
        }))
        .pipe(applyTemplate({
            engine: 'swig',
            template: function(context) {
                // console.log(context.basename);
                // console.log(context);
                return getContentGeneratorRootPath(context.data.layout, '.xml'); // typically, page-view
            },
            context: getFileContext
        }))
        .pipe(reXML())
        .pipe(gulp.dest(paths.crate.content.dest));

});

gulp.task('generate:pages:xsl', ['info'], function() {

    return gulp.src(paths.crate.content.src)
        .pipe(errorPipe())
        .pipe(pageProc())
        .pipe(plugins.changed(paths.crate.content.dest, {
            extension: '.xsl',
            hasChanged: compareToBlocks
        }))
        .pipe(xslRootPipe())
        .pipe(applyTemplate({
            engine: 'swig',
            template: function(context) {
                // console.log(context.basename);
                // console.log('%j', context.blocklist);
                return getContentGeneratorRootPath(context.data.layout, '.xsl');
            },
            context: getFileContext
        }))
        .pipe(reXSL())
        .pipe(gulp.dest(paths.crate.content.dest));
});


// gulp.task('process:imports:xsl', ['info'], function() {
//     return gulp.src(paths.crate.layout.src, {
//             base: paths.crate.base
//         })
//         .pipe(errorPipe())
//         // .pipe(plugins.changed(paths.crate.layout.dest))
//         .pipe(preProcessPipe())
//         .pipe(xslRootPipe())
//         .pipe(plugins.swig({
//             defaults: {
//                 cache: false
//             }
//         }))
//         .pipe(reXSL())
//         .pipe(gulp.dest(paths.crate.layout.dest));
// });

gulp.task('clean', function() {
    return del([paths.temp, paths.dest]);
});

gulp.task('xslt', ['content', 'blocks'], function() {

    var xslProcTemp = paths.temp;
    var xml = [xslProcTemp + 'blocks/**/*.xml', xslProcTemp + '*.xml', xslProcTemp + 'pages/**/*.xml'];

    return gulp.src(xml, {
            base: xslProcTemp
        })
        .pipe(errorPipe())
        .pipe(plugins.changed(paths.dest, {
            extension: '.html'
        }))
        .pipe(saxon({
            jarPath: __dirname + '/lib/saxon9he.jar',
            xslPath: function(file) {
                // var xslPath = gutil.replaceExtension(file.path, '.xsl');
                // console.log('\n[%s]\n', xslPath);
                return gutil.replaceExtension(file.path, '.xsl');
            },
            outputType: '.html',
            timeout: 5000
        }))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());

});


//blocks xsl
//blocks xml
//content xsl
//contenxt xml
//
//html

gulp.task('audit', function() {
    return gulp.src(paths.dest.layout)
        // .pipe(debugPipe())
        .pipe(plugins.a11y())
        .pipe(plugins.a11y.reporter());
    // .pipe(plugins.rename('test.txt'))
    // .pipe(gulp.dest('.tests/wcag'));
});

gulp.task('assets', function() {
    return gulp.src(paths.assets.src)
        .pipe(errorPipe())
        .pipe(gulp.dest(paths.assets.dest))
        .pipe(browserSync.stream());
});

gulp.task('docs', function() {
    gulp.src('./docs/**/*.md')
        .pipe(debugPipe())
        .pipe(plugins.markdown())
        .pipe(gulp.dest('./build/docs'));
});

gulp.task('webpack', function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) gutil.log(gutil.colors.yellow('Webpack error:', err.message));
        // if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('serve', ['build'], function() {
    browserSync.init(options.browserSync);
});


gulp.task('watch', ['xslt', 'serve'], function() {
    gulp.watch([
        paths.crate.content.src,
        paths.crate.layout.src[0]
    ], ['watch:content']).on('change', changeEvent('Content'));

    gulp.watch([
        paths.blocks.base + '**/*.xml',
        paths.blocks.base + '**/*.html',
        paths.blocks.base + '**/*.yaml',
        paths.blocks.base + '**/*.xsl'
    ], ['watch:blocks', 'watch:content']).on('change', changeEvent('Blocks'));

    gulp.watch([
        paths.blocks.styles.src,
        paths.crate.styles.src
    ], ['watch:styles']).on('change', changeEvent('Styles'));

    gulp.watch([
        paths.temp + '**/*'
    ], ['watch:xslt']).on('change', changeEvent('Tmp'));

    gulp.watch([
        paths.blocks.scripts.src
    ], ['watch:webpack']).on('change', changeEvent('Scripts'));

});

gulp.task('info', ['info:blocks', 'info:files']);

gulp.task('styles', ['build:css:blocks', 'build:css:crate']);
gulp.task('scripts', ['webpack']);

gulp.task('blocks', ['generate:blocks:xsl', 'generate:blocks:xml']);
gulp.task('content', ['generate:pages:xml', 'generate:pages:xsl']);

gulp.task('build', ['xslt', 'styles', 'assets', 'webpack']);

gulp.task('watch:xslt', ['xslt']);
gulp.task('watch:blocks', ['xslt']);
gulp.task('watch:content', ['xslt']);
gulp.task('watch:styles', ['styles']);
gulp.task('watch:webpack', ['webpack'], browserSync.reload);

gulp.task('dev', ['xslt', 'serve', 'watch']);
gulp.task('default', ['dev']);
