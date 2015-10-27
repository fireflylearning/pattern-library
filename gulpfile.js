/* jshint node: true */
'use strict';

var gulp = require('gulp');

var es = require('event-stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    del = require('del'),
    fm = require('front-matter'),
    _ = require('lodash-node'),
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

gulp.task('build:blocks', ['clean:blocks'], function() {

    return gulp.src(paths.blocks.layout.src, {
            base: '.'
        })
        .pipe(plugins.debug())
        // .pipe(plugins.frontMatter())
        .pipe(plugins.data(function(file) {
            var p = './' + path.relative(root, file.path);
            return require(p.replace(/\.[^/.]+$/, '.json'));
        }))
        // .pipe(plugins.markdown())
        .pipe(plugins.nunjucksHtml())
        .pipe(plugins.applyTemplate({
            engine: 'nunjucks',
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
    return nb;
}

gulp.task('build:content', ['clean:content', 'info'], function() {

    return gulp.src(paths.crate.content.src)
        .pipe(plugins.debug())
        .pipe(plugins.frontMatter({
            property: 'data',
            remove: true
        }))
        .pipe(plugins.markdown())
        .pipe(plugins.applyTemplate({
            engine: 'nunjucks',
            template: function(context) {
                return getLayoutPath(context.data.layout);
            },
            context: function(file) {
                if (file.data.blocks) file.data.blocks = normaliseBlocks(file.data.blocks);
                file.data.blockItem = getBlockPath(file.data.block);
                file.data.filelist = filelist;
                file.data.blocklist = blocklist;
                file.data.site = siteData;
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
        if (err) throw new gutil.PluginError('webpack:build-dev', err);
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

gulp.task('audit', function() {
    return gulp.src(paths.dest.layout)
        // .pipe(plugins.debug())
        .pipe(plugins.accessibility());
    // .pipe(plugins.rename('test.txt'))
    // .pipe(gulp.dest('.tests/wcag'));
});

gulp.task('assets', function(){
    return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(browserSync.stream());
});

gulp.task('info', ['info:blocks', 'info:files']);

gulp.task('styles', ['build:css:blocks', 'build:css:crate']);

gulp.task('build', ['build:content', 'build:blocks', 'styles', 'assets','webpack']);

gulp.task('watch:blocks', ['build:blocks'], browserSync.reload);
gulp.task('watch:content', ['build:content'], browserSync.reload);

gulp.task('webpack:watch', ['webpack']);
gulp.task('dev', ['build', 'serve', 'watch']);
gulp.task('default', ['dev']);
