/* jshint node: true */
'use strict';

var gulp = require('gulp');

var es = require('event-stream'),
    fs = require('fs'),
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

// TODO: Error handling
function getLayoutPath(layoutname) {
    layoutname = layoutname || 'view-block-isolate';
    return './crate/layout/' + layoutname + '.html';
}


gulp.task('clean:crate', function() {
    return del(paths.dest.layout);
});

gulp.task('clean:blocks', function() {
    return del(['.tmp/' + paths.blocks.base, paths.dest.base + paths.blocks.base]);
});

gulp.task('clean:content', function() {
    return del(paths.dest.base + '/content');
});

gulp.task('clean', ['clean:blocks', 'clean:templates', 'clean:blocks']);


gulp.task('docs', function() {
    gulp.src('./docs/**/*.md')
        .pipe(plugins.debug())
        .pipe(plugins.markdown())
        .pipe(gulp.dest('./build/docs'));
});


var blocklist;
// var bLPath = paths.blocks.layout.src;
var blPath = 'blocks-x/**/*.xml';


gulp.task('info:blocks', function() {
    blocklist = [];
    return gulp.src(blPath)
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
// var ifPath = paths.crate.content.src;
var fLPath = 'crate-x/content/**/*.md';

gulp.task('info:files', function() {
    filelist = [];
    return gulp.src(fLPath, {
            base: '.'
        })
        .pipe(plugins.debug())
        .pipe(fmPipe())
        .pipe(plugins.rename({
            extname: '.xml'
        }))
        .pipe(plugins.tap(function(file) {
            var fdata;
            var basename = path.basename(file.path, path.extname(file.path));
            if (basename !== 'index') {
                fdata = _.merge(file.data, {
                    path: path.relative(path.join(root, 'crate-x/content'), file.path),
                    basename: basename,
                    link: path.join('/', path.relative(path.join(root, 'crate-x/content'), file.path)),
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



gulp.task('build:blocks', ['clean:blocks', 'info'], function() {

    return gulp.src(paths.blocks.layout.src, {
            base: '.'
        })
        .pipe(plugins.debug())
        // .pipe(plugins.frontMatter())
        .pipe(plugins.data(function(file) {
            var p = './' + path.relative(root, file.path);
            var jsonData = require(p.replace(/\.[^/.]+$/, '.json'));

            return _.merge(jsonData, {
                site: siteData
            });
        }))
        // .pipe(plugins.markdown())
        .pipe(plugins.swig())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: './crate/layout/view-block-isolate.html',
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.temp))
        .pipe(gulp.dest(paths.blocks.layout.dest))
        .pipe(browserSync.stream());
});

function normaliseBlocks(blocks) {

    if (blocks === undefined || blocks === null) return null;
    var nb = [];

    blocks.forEach(function(block) {

        for (var name in block) {
            console.log(name);
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

gulp.task('build:content', ['clean:content', 'info'], function() {

    return gulp.src(paths.crate.content.src)
        .pipe(plugins.debug())
        .pipe(fmPipe())
        .pipe(plugins.markdown())
        .pipe(plugins.data(function(file) {
            console.log('blocks: %j', file.data.blocks);
            var attrs = file.data;
            return _.merge(attrs, {
                blockItem: getBlockPath(file.data.block),
                filelist: filelist,
                blocklist: blocklist,
                // blocks: normaliseBlocks(file.data.blocks),
                site: siteData
            });
        }))
        // .pipe(plugins.wrap(function(context) {
        //     console.log('context: %j', context.file.data.layout);
        //     return getLayoutPath(context.file.data.layout);
        // }, {}, {
        //     engine: 'nunjucks'
        // }))
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                return getLayoutPath(context.data.layout);
            },
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.size())
        .pipe(plugins.rename({
            extname: '.html'
        }))
        .on('error', function(er) {
            console.log(er);
        })
        .pipe(gulp.dest(paths.crate.content.dest))
        .pipe(browserSync.stream());
});

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
        paths.blocks.layout.src
    ], ['build:content', 'build:blocks']).on('change', changeEvent);

    gulp.watch([
        paths.blocks.styles.src,
        paths.crate.styles.src
    ], ['styles']);

    gulp.watch([paths.blocks.scripts.src], ['webpack:watch']);

});




var fmPipe = lazypipe()
    .pipe(plugins.frontMatter, {
        property: 'data',
        remove: true
    });

var fileDataPipe = lazypipe()
    .pipe(plugins.data, function(file) {
        return getFileData(file);
    });


var preProcessPipe = lazypipe()
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
        // console.log('blocks: %j', file.data.blocks);
        return file.data;
    });

var xblockroot = 'blocks-x';
var xcrateroot = 'crate-x';
var xdestroot = 'wwwroot';
var templateroot = ['.', xcrateroot, 'layout'].join('/');

var xmlsrc = [xblockroot, '**/*.xml'].join('/');
var xslsrc = [xblockroot, '**/*.xsl'].join('/');
var xcontentXMLsrc = [xcrateroot, 'content', '**/*.xml'].join('/');
var xcontentMDsrc = [xcrateroot, 'content', '**/*.md'].join('/');
var xstylessrc = [xcrateroot, 'layout', '**/*.xsl'].join('/');

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

function getLayoutRootPath(layoutname, ext) {
    ext = ext || '.xml';
    var layoutroot = path.join(root, xcrateroot, 'layout', 'pages', 'src');
    var layoutpath = layoutroot + '/' + layoutname + ext;
    // console.log(layoutpath);
    return layoutpath;
}

function getAbsPath(layoutpath) {
    var p = path.relative(root, layoutpath);
    // console.log(p);
    return p;
}


gulp.task('clean:xml', function() {
    return del([xdestroot + '/**/*.xml', xdestroot + '/**/*.xsl']);
});

gulp.task('clean:pagesx', function() {
    return del(xdestroot + '/pages');
});

gulp.task('blocksx:generate:xsl', ['clean:xml', 'info'], function() {
    var xsl = gulp.src(xslsrc)
        .pipe(preProcessPipe())
        .pipe(plugins.rename({
            extname: '.xsl'
        }));

    var merged = xsl
        .pipe(plugins.concat('all.xsl'))
        .pipe(plugins.wrap('<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ff_module="http://www.fireflylearning/module"><%= contents %></xsl:stylesheet>'));

    var wrapped = xsl
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                return templateroot + '/blocks/src/block-view.xsl';
            },
            context: function(file) {
                return file.data;
            }
        }));

    return es.merge(merged, wrapped)
        .pipe(gulp.dest(xdestroot + '/blocks-x/'));

});

gulp.task('blocksx:generate:xml', ['clean:xml', 'info'], function() {
    return gulp.src(xmlsrc)
        .pipe(preProcessPipe())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: templateroot + '/blocks/src/block-view.xml',
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.rename({
            extname: '.xml'
        }))
        .pipe(gulp.dest(xdestroot + '/blocks-x/'));
});



gulp.task('pagesx:generate:xml', ['clean:pagesx', 'info'], function() {
    return gulp.src(xcontentMDsrc)
        .pipe(pageProc())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                return getAbsPath(getLayoutRootPath(context.data.layout, '.xml')); // typically, page-view
            },
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.rename({
            extname: '.xml'
        }))
        .pipe(gulp.dest(xdestroot));

});

gulp.task('pagesx:generate:xsl', ['clean:pagesx', 'info'], function() {
    return gulp.src(xcontentMDsrc)
        .pipe(pageProc())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                return getAbsPath(getLayoutRootPath(context.data.layout, '.xsl'));
            },
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.rename({
            extname: '.xsl'
        }))
        .pipe(gulp.dest(xdestroot));
});

gulp.task('pagesx', ['pagesx:generate:xml', 'pagesx:generate:xsl']);

gulp.task('shared:process:xsl', ['clean:xml', 'info'], function() {
    // ['app/**', '!app/{_tmp,_tmp/**}']
    // ['crate-x', 'layout', '**/*.xsl'].join('/')

    return gulp.src([xstylessrc, '!crate-x/layout/*/src/**/*.xsl'], {
            base: 'crate-x'
        })
        .pipe(preProcessPipe())
        .pipe(plugins.rename({
            extname: '.xsl'
        }))
        .pipe(gulp.dest(xdestroot));
});

gulp.task('shared:process:xml', ['clean:xml', 'info'], function() {
    return gulp.src([xcontentXMLsrc, xcrateroot + '/index.xml'])
        .pipe(preProcessPipe())
        .pipe(plugins.rename({
            extname: '.xml'
        }))
        .pipe(gulp.dest(xdestroot));
});


gulp.task('xml:build', ['output:info:files', 'output:info:blocks', 'shared:process:xsl', 'shared:process:xsl', 'blocksx:generate:xsl', 'blocksx:generate:xml', 'pagesx']);


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

gulp.task('info', ['info:blocks', 'info:files']);

gulp.task('styles', ['build:css:blocks', 'build:css:crate']);
gulp.task('scripts', ['webpack']);

gulp.task('xbuild', ['xml:build', 'styles', 'assets', 'webpack']);
gulp.task('build', ['build:content', 'build:blocks', 'styles', 'assets', 'webpack']);

gulp.task('watch:blocks', ['build:blocks'], browserSync.reload);
gulp.task('watch:content', ['build:content'], browserSync.reload);

gulp.task('webpack:watch', ['webpack']);
gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['dev']);
