/* jshint node: true */
'use strict';

var gulp = require('gulp');

var es = require('event-stream'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    path = require('path'),
    del = require('del'),
    fm = require('front-matter'),
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
gulp.task('info:blocks', function() {
    blocklist = [];
    return gulp.src(paths.blocks.layout.src)
        .pipe(plugins.debug())
        .pipe(plugins.tap(function(file) {
            var ext = path.extname(file.path);
            var basename = path.basename(file.path, ext);
            var relpath = path.relative(root, file.path);
            var p = './' + relpath;
            var data = require(p.replace(/\.[^/.]+$/, '.json'));
            var bdata = _.merge({
                basename: basename,
                path: relpath,
                link: '/' + relpath,
                site: siteData
            }, data);

            blocklist.push(bdata);
        }));
});

var filelist;
gulp.task('info:files', function() {
    filelist = [];
    return gulp.src(paths.crate.content.src)
        .pipe(plugins.debug())
        .pipe(fmPipe())
        .pipe(plugins.tap(function(file) {
            // console.log(file);
            var fdata;
            var ext = path.extname(file.path);
            var basename = path.basename(file.path, ext);
            var relpath = path.relative(path.join(root, paths.crate.base), file.path);
            relpath = relpath.replace(/\.[^/.]+$/, '.html');
            var content = fm(String(file.contents));
            var attrs = content.attributes;

            if (basename !== 'index') {
                fdata = _.merge({
                    path: relpath,
                    extname: ext,
                    basename: basename,
                    link: '/' + relpath,
                    site: siteData
                }, attrs);
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
        .pipe(plugins.nunjucksHtml())
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
    blocks = [].concat(blocks);
    console.log(blocks);
    var nb = [];
    blocks.forEach(function(block) {

        for (var name in block) {
            nb.push({
                name: name,
                blockpath: '/' + getBlockPath(name),
                contexts: [].concat(block[name])
            });
        }
    });
    console.log(nb);
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



// var libxslt = require('libxslt');


// function gulpXSLT(template, config) {
//     if (!template) throw new Error('Template option missing');

//     var parameters = [];

//     if (config) {
//         Object.keys(config).forEach(function(item) {
//             parameters.push(item, config[item]);
//         });
//     }

//     parameters = parameters || [];
//     var stylesheet;

//     try {
//         var stylesheetSource = fs.readFileSync(template, 'utf8');
//         // console.log(stylesheetSource);

//         stylesheet = libxslt.parse(stylesheetSource);
//         // console.log(stylesheet);
//     } catch (e) {
//         throw new Error(e.message);
//     }

//     function modifyContents(file, cb) {

//         console.log(file.isBuffer());

//         function throwError(message) {
//             return cb(new gutil.PluginError('gulp-xslt', message));
//         }

//         if (file.isNull()) {
//             return cb(null, file);
//         }

//         if (file.isStream()) {
//             return throwError('Streaming not supported');
//         }

//         if (file.isBuffer()) {
//             try {

//                 // console.log(libxmljs);

//                 var document = file.contents.toString();
//                 // console.log(document);
//                 stylesheet.apply('<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="test.xsl"?><class><student>Jack</student><student>Harry</student><student>Rebecca</student><teacher>Mr. Bean</teacher></class>', function(err, result) {
//                     console.log(err, result);
//                 });
//                 // stylesheet.apply(document, function(err, result) {
//                 //     console.log(err, result);
//                 //     // if(err) return throwError(err);
//                 //     file.contents = new Buffer(result);
//                 //     return cb(null, file);
//                 // });
//                 return cb(null, file);

//             } catch (e) {
//                 return throwError(e.message);
//             }

//         }


//     }

//     return es.map(modifyContents);
// }


// var xslt4node = require('xslt4node');
// xslt4node.addLibrary('./lib/saxon9he.jar');

// function xsltNode(cb) {
//     var config = {
//         xsltPath: './blocks-xslt/test.xsl',
//         sourcePath: './blocks-xslt/test.xml',
//         result: './blocks-xslt/result.xml',
//         params: {
//             discount: '2014/08/01'
//         },
//         props: {
//             indent: 'yes'
//         }
//     };

//     xslt4node.transform(config, function(err, result) {
//         if (err) {
//             console.log(err);
//             return cb(err);
//         }
//         cb(null);
//     });
// }
//

var blist = [{
    name: 'ff_module-button',
    link: 'blocks-x/ff_module-button/ff_module-button.xml'
}, {
    name: 'ff_module-title',
    link: 'blocks-x/ff_module-title/ff_module-title.xml'
}];

var plist = [{
    title: 'Long button text'
}];

function getFileData(file) {
    var ext = path.extname(file.path),
        basename = path.basename(file.path, ext),
        relpath = path.relative(root, file.path);

    return _.merge(file.data, {
        name: basename,
        path: relpath,
        link: '/' + relpath,
        site: siteData,
        blocklist: blist,
        pagelist: plist
    });
}

var fmPipe = lazypipe()
    .pipe(plugins.frontMatter, {
        property: 'data',
        remove: true
    });

var fileDataPipe = lazypipe()
    .pipe(plugins.data, function(file) {
        return getFileData(file);
    });


var xblockroot = 'blocks-x';
var xcrateroot = 'crate-x';
var xdestroot = 'wwwroot';
var templateroot = ['.', xcrateroot, 'layout'].join('/');

var xmlsrc = [xblockroot, '**/*.xml'].join('/');
var xslsrc = [xblockroot, '**/*.xsl'].join('/');
var xcontentXMLsrc = [xcrateroot, 'content', '**/*.xml'].join('/');
var xcontentMDsrc = [xcrateroot, 'content', '**/*.md'].join('/');
var xstylessrc = [xcrateroot, 'layout', 'xstyles', '**/*.xsl'].join('/');


gulp.task('clean:xml', function() {
    return del([xdestroot + '/**/*.xml', xdestroot + '/**/*.xsl']);
});

gulp.task('clean:xcontent', function() {
    return del(xdestroot + '/pages');
});

gulp.task('merge:xml', ['clean:xml'], function() {
    return gulp.src(xmlsrc)
        .pipe(preProcessPipe())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                // return getRelativePath(getPartialRootPath('block-wrap'), context.file.path);
                return templateroot + '/partials/block-wrap.xml';
            },
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.concat('all.xml'))
        .pipe(plugins.wrap('<?xml version="1.0" encoding="UTF-8"?><blocks xmlns:ff_module="http://www.fireflylearning/module"><%= contents %></blocks>'))
        .pipe(gulp.dest(xdestroot + '/blocks-x/'));
});

gulp.task('merge:xsl', ['clean:xml'], function() {
    var xsl = gulp.src(xslsrc)
        .pipe(preProcessPipe());

    var merged = xsl
        .pipe(plugins.concat('all.xsl'))
        .pipe(plugins.wrap('<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ff_module="http://www.fireflylearning/module"><%= contents %></xsl:stylesheet>'))
        .pipe(gulp.dest(xdestroot + '/blocks-x/'));

    var wrapped = xsl
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                // return getRelativePath(getPartialRootPath('block-wrap'), context.file.path);
                return templateroot + '/xstyles/partials/block-wrap.xsl';
            },
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(gulp.dest(xdestroot + '/blocks-x/'));

    return es.merge(merged, wrapped);

});

gulp.task('xml:addmeta', ['clean:xml'], function() {
    return gulp.src(xmlsrc)
        .pipe(preProcessPipe())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: templateroot + '/block-isolate.xml',
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(gulp.dest(xdestroot + '/blocks-x/'));
});

function getPartialRootPath(layoutname) {
    var layoutroot = path.join(root, xcrateroot, 'layout');
    var layoutpath = layoutroot + '/partials/' + layoutname + '.xml';
    console.log(layoutpath);
    return layoutpath;
}

function getLayoutRootPath(layoutname, ext) {
    ext = ext || '.xml';
    var layoutroot = path.join(root, xcrateroot, 'layout');
    var layoutpath = layoutroot + '/' + layoutname + ext;
    console.log(layoutpath);
    return layoutpath;
}

function getAbsPath(layoutpath) {
    var p = path.relative(root, layoutpath);
    console.log(p);
    return p;
}

function getRelativePath(layoutpath, filepath) {

    console.log(layoutpath, filepath);
    var p1 = path.relative(root, filepath);
    var p2 = path.relative(root, layoutpath);
    var p1p2 = path.relative(p1, p2);
    var p2p1 = path.relative(p2, p1);
    var relpath = path.relative(filepath, layoutpath);
    var relpath2 = path.relative(layoutpath, filepath);
    // console.log(relpath, relpath2);
    console.log(p1p2, p2p1);
    return relpath2;
    // return relpath + '/' + layoutname + '.xml';
    // return path.join(xcrateroot, 'layout', layoutname) + '.xml';
}
gulp.task('xcontent', ['clean:xcontent'], function() {
    var content = gulp.src(xcontentMDsrc)
        .pipe(preProcessPipe())
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                console.log(context.data.blocks);
                return getAbsPath(getLayoutRootPath(context.data.layout));
            },
            context: function(file) {
                return file.data;
            }
        }));

    var layout = content
        .pipe(plugins.rename({
            extname: '.xml'
        }))
        .pipe(gulp.dest(xdestroot));

    var style = content
        .pipe(plugins.applyTemplate({
            engine: 'swig',
            template: function(context) {
                console.log(context.data.blocks);
                return getAbsPath(getLayoutRootPath('/xstyles/partials/page-view-blocklist', '.xsl'));
            },
            context: function(file) {
                return file.data;
            }
        }))
        .pipe(plugins.rename({
            extname: '.xsl'
        }))
        .pipe(gulp.dest(xdestroot));

        return es.merge(layout, style);
});

gulp.task('xml:copy', ['clean:xml'], function() {
    return gulp.src(xstylessrc, {
            base: 'crate-x'
        })
        .pipe(preProcessPipe())
        .pipe(gulp.dest(xdestroot));
});

var preProcessPipe = lazypipe()
    .pipe(fmPipe)
    .pipe(fileDataPipe)
    // .pipe(plugins.markdown)
    // .pipe(plugins.rename,{
    //     extname: '.xml'
    // });
    .pipe(plugins.nunjucksHtml);

gulp.task('xml:build', ['merge:xml', 'merge:xsl', 'xml:copy', 'xml:addmeta', 'xcontent'], function() {
    return gulp.src([xcontentXMLsrc, xcrateroot + '/index.xml'])
        .pipe(preProcessPipe())
        .pipe(gulp.dest(xdestroot));
});


gulp.task('merge', ['merge:xml', 'merge:xsl']);


// gulp.task('xslt', function(cb) {
//     var xml = [__dirname,'blocks-xslt','test.xml'].join('/');
//     var out = [__dirname,'blocks-xslt','out'].join('/');

//   return gulp.src(xml).pipe(plugins.saxon({
//     jarPath: [__dirname,'lib','saxon9he.jar'].join('/'),
//     xslPath: [__dirname,'blocks-xslt','test2.xslt'].join('/'),
//     outputType: '.html',
//     timeout: 5000
//   })).pipe(gulp.dest(out));

// });

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

gulp.task('build', ['build:content', 'build:blocks', 'styles', 'assets', 'webpack']);

gulp.task('watch:blocks', ['build:blocks'], browserSync.reload);
gulp.task('watch:content', ['build:content'], browserSync.reload);

gulp.task('webpack:watch', ['webpack']);
gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['dev']);
