/* jshint node: true */
'use strict';

var gulp = require('gulp');

var es = require('event-stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    del = require('del'),
    _ = require('lodash-node'),
    lazypipe = require('lazypipe'),
    LessAutoprefixer = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4']
    }),

    webpack = require('webpack'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    }),
    paths = require('./config/paths.js'),
    webpackConfig = require('./config/webpack.js'),
    siteData = require('./config/crate.js');

var browserSync = require('browser-sync').create();


var root = path.join(__dirname);

var blockCssOut = 'blocks.min.css',
    crateCssOut = 'crate.min.css';

var devCompiler = webpack(webpackConfig);

function changeEvent(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + paths.blocks.base + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
}

function buildCss(src, name, dest) {
    console.log(src, name, dest);

    return gulp.src(src, {
            base: '.'
        })
        .pipe(plugins.debug())
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .on('error', function(err) {
            new gutil.PluginError('CSS', err, {
                showStack: true
            });
        })
        // .pipe(isProduction ? plugins.combineMediaQueries({
        //     log: true
        // }) : gutil.noop())
        // .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat(name))
        .pipe(plugins.size())
        .pipe(gulp.dest(dest))
        .pipe(gulp.dest('wwwroot/css'))
        .pipe(browserSync.stream());
}

// TODO: Error handling
function getBlockPath(basename) {
    var blocknames = blocklist.filter(function(block) {
            return block.basename === basename;
        })
        .map(function(block) {
            return block.path;
        });

    return blocknames.length ? blocknames[0] : '';
}

function normaliseBlocks(blocks) {
    if (blocks === undefined || blocks === null) return null;
    var nb = [];

    blocks.forEach(function(block) {
        for (var name in block) {
            nb.push({
                basename: name,
                path: getBlockPath(name),
                link: '/' + getBlockPath(name),
                contexts: [].concat(block[name])
            });
        }
    });
    // console.log('%j', nb);
    return nb;
}

var blocklist = [];
gulp.task('info:blocks', function() {
    blocklist = [];
    return gulp.src(paths.blocklist)
        .pipe(plugins.debug())
        .pipe(fmPipe())
        .pipe(plugins.tap(function(file) {
            // console.log(file.data, String(file.contents));
            //require(p.replace(/\.[^/.]+$/, '.json'));

            var bdata = _.merge({
                basename: path.basename(file.path, path.extname(file.path)),
                path: path.relative(path.join(root, ''), file.path),
                link: path.join('/', path.relative(path.join(root, ''), file.path)),
                site: siteData,
                contents: String(file.contents)
            }, file.data || {});

            blocklist.push(bdata);
        }));
});


var filelist;
gulp.task('info:files', function() {
    filelist = [];
    return gulp.src(paths.crate.content.src, {
            base: '.'
        })
        .pipe(plugins.debug())
        .pipe(fmPipe())
        .pipe(reXML())
        .pipe(plugins.tap(function(file) {
            var fdata;
            var basename = path.basename(file.path, path.extname(file.path));
            if (basename !== 'index') {
                fdata = _.merge(file.data, {
                    path: path.relative(path.join(root, paths.crate.content.base), file.path),
                    basename: basename,
                    link: path.join('/', path.relative(path.join(root, paths.crate.content.base), file.path)),
                    site: siteData,
                    contents: String(file.contents)
                });
            }

            if (fdata) filelist.push(fdata);

        }));

});


gulp.task('output:info:files', ['info:files', 'info:blocks'], function(cb) {
    console.log(filelist);
    cb();
});

gulp.task('output:info:blocks', ['info:blocks'], function(cb) {
    console.log(blocklist);
    cb();
});






// gulp.task('build:content', ['clean:content', 'info'], function() {

//     return gulp.src(paths.crate.content.src)
//         .on('error', logApplyTemplateErr)
//         .pipe(pageProc())
//         .pipe(plugins.applyTemplate({
//             engine: 'swig',
//             template: function(context) {
//                 var d = getContentGeneratorRootPath(context.data.layout, '.html');
//                 // console.log(d);
//                 return d;
//                 // return getContentGeneratorRootPath(context.data.layout, '.html');
//             },
//             context: getFileContext
//         }))
//         .pipe(reHTML())
//         .pipe(gulp.dest(paths.crate.content.dest));
//     // .pipe(browserSync.stream());
// });

gulp.task('build:css:blocks', function() {
    return buildCss(paths.blocks.styles.src, blockCssOut, paths.blocks.styles.dest);
});


gulp.task('build:css:crate', function() {
    return buildCss(paths.crate.styles.src, crateCssOut, paths.crate.styles.dest);
});

gulp.task('webpack', function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        browserSync.reload();
        callback();
    });
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: paths.dest.base
    });
});


gulp.task('watch', ['build', 'serve'], function() {
    gulp.watch([
        paths.crate.content.src,
        paths.crate.layout.src,
        paths.blocks.html.src
    ], ['content', 'blocks:generate:html']).on('change', changeEvent);

    gulp.watch([
        paths.blocks.styles.src,
        paths.crate.styles.src
    ], ['styles']);

    gulp.watch([paths.blocks.scripts.src], ['webpack:watch']);

});


function logApplyTemplateErr(err) {
    new gutil.PluginError('ApplyTemplate', err, {
        showStack: true
    });
}

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

var reHTML = lazypipe()
    .pipe(plugins.rename, {
        extname: '.html'
    });

var fileDataPipe = lazypipe()
    .pipe(plugins.data, function(file) {
        return getFileData(file);
    });

var preProcessPipe = lazypipe()
    .pipe(plugins.debug)
    .pipe(fmPipe)
    .pipe(fileDataPipe)
    // .pipe(plugins.markdown)
    // .pipe(plugins.rename,{
    //     extname: '.xml'
    // });
    .pipe(plugins.swig);

var pageProc = lazypipe()
    .pipe(preProcessPipe)
    .pipe(plugins.data, function(file) {
        if (file.data && file.data.blocks) {
            file.data.blocks = normaliseBlocks(file.data.blocks);
        }
        console.log('blocks: %j', file.data.blocks);
        return file.data;
    });


function getFileData(file) {
    var ext = path.extname(file.path),
        dirname = path.dirname(file.path),
        basename = path.basename(file.path, ext),
        relpath = path.relative(root, file.path),
        basepath = path.relative(root, path.join(dirname, basename));

    return _.merge(file.data, {
        basename: basename,
        basepath: basepath,
        path: relpath,
        link: '/' + relpath,
        site: siteData,
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
    return file.data;
}



gulp.task('blocks:generate:html', ['clean:blocks', 'info'], function() {

    return gulp.src(paths.blocks.html.src, {
            base: '.'
        })
        .pipe(preProcessPipe())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: getBlockGeneratorRootPath('block-view', '.html'),
            context: getFileContext
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.temp))
        .pipe(gulp.dest(paths.blocks.html.dest))
        .pipe(browserSync.stream());
});

gulp.task('blocks:generate:xsl', ['clean:xml', 'info'], function() {
    var xsl = gulp.src(paths.blocks.xsl.src)
        .pipe(preProcessPipe())
        .pipe(reXSL());

    var merged = xsl
        .pipe(plugins.concat('all.xsl'))
        .pipe(plugins.wrap('<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ff_module="http://www.fireflylearning/module"><%= contents %></xsl:stylesheet>'));

    var wrapped = xsl
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: getBlockGeneratorRootPath('block-view', '.xsl'),
            context: getFileContext
        }));

    return es.merge(merged, wrapped)
        .pipe(gulp.dest(paths.blocks.xsl.dest));

});

gulp.task('blocks:generate:xml', ['clean:xml', 'info'], function() {
    return gulp.src(paths.blocks.xml.src)
        .pipe(preProcessPipe())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: getBlockGeneratorRootPath('block-view', '.xml'),
            context: getFileContext
        }))
        .pipe(reXML())
        .pipe(gulp.dest(paths.blocks.xml.dest));
});



gulp.task('content:generate:xml', ['clean:pagesx', 'info'], function() {
    return gulp.src(paths.crate.content.src)
        .pipe(pageProc())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                return getContentGeneratorRootPath(context.data.layout, '.xml'); // typically, page-view
            },
            context: getFileContext
        }))
        .pipe(reXML())
        .pipe(gulp.dest(paths.crate.content.dest));

});

gulp.task('content:generate:xsl', ['clean:pagesx', 'info'], function() {
    return gulp.src(paths.crate.content.src)
        .pipe(pageProc())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                return getContentGeneratorRootPath(context.data.layout, '.xsl');
            },
            context: getFileContext
        }))
        .pipe(reXSL())
        .pipe(gulp.dest(paths.crate.content.dest));
});



gulp.task('includes:process:xsl', ['clean:xml', 'info'], function() {
    // ['app/**', '!app/{_tmp,_tmp/**}']
    // ['crate-x', 'layout', '**/*.xsl'].join('/')

    return gulp.src(paths.crate.layout.src, {
            base: paths.crate.base
        })
        .pipe(preProcessPipe())
        .pipe(reXSL())
        .pipe(gulp.dest(paths.crate.layout.dest));
});





gulp.task('audit', function() {
    return gulp.src(paths.dest.layout)
        // .pipe(plugins.debug())
        .pipe(plugins.a11y())
        .pipe(plugins.a11y.reporter());
    // .pipe(plugins.rename('test.txt'))
    // .pipe(gulp.dest('.tests/wcag'));
});

gulp.task('assets', ['clean:xml'], function() {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest))
        .pipe(gulp.dest('wwwroot/'))
        .pipe(browserSync.stream());
});

gulp.task('clean:crate', function() {
    return del(paths.dest.layout);
});

gulp.task('clean:blocks', function() {
    return del(['.tmp/' + paths.blocks.base, paths.dest.base + paths.blocks.base]);
});

gulp.task('clean:content', function() {
    return del(paths.dest.base + '/content');
    // return del('');
});

gulp.task('clean:xml', function() {
    return del([paths.dest.xml, paths.dest.xsl]);
    // return del('');
});

gulp.task('clean:pagesx', function() {
    return del(paths.dest.pages);
    // return del('');
});


gulp.task('docs', function() {
    gulp.src('./docs/**/*.md')
        .pipe(plugins.debug())
        .pipe(plugins.markdown())
        .pipe(gulp.dest('./build/docs'));
});

gulp.task('clean', ['clean:blocks', 'clean:templates']);
gulp.task('info', ['info:blocks', 'info:files']);

gulp.task('styles', ['build:css:blocks', 'build:css:crate']);
gulp.task('scripts', ['webpack']);

gulp.task('blocks', ['blocks:generate:xsl', 'blocks:generate:xml','blocks:generate:html']);
gulp.task('content', ['content:generate:xml', 'content:generate:xsl', 'includes:process:xsl']);

gulp.task('build', ['output:info:files', 'output:info:blocks','content', 'blocks', 'styles', 'assets', 'webpack']);

gulp.task('watch:blocks', ['blocks'], browserSync.reload);
gulp.task('watch:content', ['content'], browserSync.reload);

gulp.task('webpack:watch', ['webpack']);
gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['dev']);
