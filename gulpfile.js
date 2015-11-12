'use strict';

var gulp = require('gulp');

var gutil = require('gulp-util'),
    path = require('path'),
    yaml = require('js-yaml'),
    fs = require('fs'),
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
    saxon = require('./lib/node_modules/gulp-saxon'),
    applyTemplate = require('./lib/node_modules/gulp-apply-template'),
    paths = require('./config/paths.js'),
    getWebpackConfig = require('./config/webpack.js'),
    siteData = require('./config/crate.js'),
    options = require('./config/options.default.js'),

    changedHelpers = require('./lib/gulp-changed-helpers'),
    root = path.join(__dirname),
    blockCssOut = 'blocks.min.css',
    crateCssOut = 'crate.min.css';

var isDebugging,
    debugPipe,
    isProduction,
    sourceMapsStart,
    sourceMapsEnd,
    browserSync,
    devCompiler,
    webpackConfig,
    locals = {};

try {
    locals = require('./config/options.local.js');
} catch (e) {}

var options = _.defaults(locals, options);

isDebugging = options.isDebugging;
isProduction = options.isProduction;

if (isDebugging) {
    debugPipe = lazypipe()
        .pipe(plugins.debug)
        .pipe(plugins.size);
} else {
    debugPipe = lazypipe()
        .pipe(gutil.noop);
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
devCompiler = webpack(webpackConfig);

var errorPipe = lazypipe()
    .pipe(plugins.plumber, {
        errorHandler: plugins.notify.onError({
            message: '<%= error.message %>',
            title: 'Error'
        })
    });

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

var pageProc = lazypipe()
    .pipe(preProcessPipe)
    .pipe(plugins.data, function(file) {
        if (file.data && file.data.blocks) {
            file.data.blocks = normaliseBlocks(file.data.blocks);
        }

        return file.data;
    });

var defaultDataPipe = lazypipe()
    .pipe(plugins.tap, function(file) {

        var yamlPath = './' + gutil.replaceExtension(path.relative(root, file.path), '.yaml'),
            yamlFile;

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
        return _.merge(file.data, {
            xslPath: rel,
            xslRoot: path.join(root, xslProcTemp, '/')
        });
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
        .pipe(debugPipe())
        .pipe(sourceMapsStart())
        .pipe(plugins.concat(name))
        .pipe(plugins.less({
            plugins: [autoprefix]
        }))
        .pipe(plugins.minifyCss())
        .pipe(sourceMapsEnd())
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
    return p;
}

function getFileContext(file) {
    return _.merge(file.data, {
        cache: false
    });
}






var blocklist = [];
gulp.task('info:blocks', function() {
    blocklist = [];
    return gulp.src(paths.blocklist)
        .pipe(errorPipe())
        .pipe(plugins.cached('blocks'))
        .pipe(debugPipe())
        .pipe(fmPipe())
        .pipe(defaultDataPipe())
        .pipe(plugins.remember('blocks'))
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
        .pipe(plugins.cached('files'))
        .pipe(debugPipe())
        .pipe(fmPipe())
        .pipe(plugins.remember('files'))
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


gulp.task('output:filelist', ['info:files', 'info:blocks'], function(cb) {
    console.log(gutil.colors.dim('%j'), filelist);
    cb();
});

gulp.task('output:blocklist', ['info:blocks'], function(cb) {
    console.log(gutil.colors.dim('%j'), blocklist);
    cb();
});



gulp.task('build:css:blocks', function() {
    return buildCss(paths.blocks.styles.src, blockCssOut, paths.blocks.styles.dest);
});


gulp.task('build:css:crate', function() {
    return buildCss(paths.crate.styles.src, crateCssOut, paths.crate.styles.dest);
});




gulp.task('generate:blocks:xsl', ['info'], function() {

    return gulp.src(paths.blocks.xsl.src)
        .pipe(errorPipe())
        .pipe(plugins.changed(paths.blocks.xsl.dest))
        .pipe(debugPipe())
        .pipe(fmPipe())
        .pipe(reXSL())
        .pipe(fileDataPipe())
        .pipe(xslRootPipe())
        .pipe(reXSL())
        .pipe(applyTemplate({
            engine: 'swig',
            template: getBlockGeneratorRootPath('block-view', '.xsl'),
            context: getFileContext
        }))
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
        .pipe(plugins.cached('content'))
        .pipe(errorPipe())
        .pipe(pageProc())
        .pipe(plugins.changed(paths.crate.content.dest, {
            extension: '.xml',
            hasChanged: changedHelpers.compareToBlocks(root, blocklist)
        }))
        .pipe(applyTemplate({
            engine: 'swig',
            template: function(context) {
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
            hasChanged: changedHelpers.compareToBlocks(root, blocklist)
        }))
        .pipe(xslRootPipe())
        .pipe(applyTemplate({
            engine: 'swig',
            template: function(context) {
                return getContentGeneratorRootPath(context.data.layout, '.xsl');
            },
            context: getFileContext
        }))
        .pipe(reXSL())
        .pipe(gulp.dest(paths.crate.content.dest));
});


gulp.task('clean', function() {
    return del(paths.clean);
});

gulp.task('xslt', ['content', 'blocks'], function() {

    var xslProcTemp = paths.temp;
    var xml = [xslProcTemp + 'blocks/**/*.xml', xslProcTemp + '*.xml', xslProcTemp + 'pages/**/*.xml'];

    return gulp.src(xml, {
            base: xslProcTemp
        })
        .pipe(errorPipe())
        .pipe(plugins.changed(paths.dest, {
            extension: '.html',
            hasChanged: changedHelpers.compareToXSL
        }))
        .pipe(saxon({
            jarPath: __dirname + '/lib/saxon9he.jar',
            xslPath: function(file) {
                return gutil.replaceExtension(file.path, '.xsl');
            },
            outputType: '.html',
            timeout: 5000
        }))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());

});

//TODO: Get working
gulp.task('audit', ['xslt'], function() {
    return gulp.src(paths.dest)
        // .pipe(debugPipe())
        .pipe(plugins.a11y())
        .pipe(plugins.a11y.reporter());
    // .pipe(plugins.rename('test.txt'))
    // .pipe(gulp.dest('.tests/wcag'));
});

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
        .pipe(plugins.watch(paths.assets.src))
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
        if (isDebugging) {
            gutil.log('[webpack]', stats.toString({
                colors: true
            }));
        }

        callback();
    });
});

gulp.task('serve', ['xslt'], function() {
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
gulp.task('watch:webpack', ['webpack'], function(callback) {
    browserSync.reload('*.js');
    callback();
});

gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['dev']);
