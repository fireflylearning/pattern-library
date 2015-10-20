var gulp = require('gulp');

var es = require('event-stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    glob = require('glob'),
    del = require('del');


var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var root = path.join(__dirname);

var basePaths = {
    blocks: 'core_blocks/',
    dest: 'build/',
    crate: 'crate/',
    temp: 'tmp/'
};

var blockCssOut = 'blocks.min.css',
    crateCssOut = 'crate.min.css';

var paths = {
    crate: {
        content: {
            src: basePaths.crate + '**/*.md',
            dest: basePaths.dest
        },
        layout: {
            src: basePaths.crate + '**/*.html',
            dest: basePaths.dest
        },
        styles: {
            src: basePaths.crate + '**/*.less',
            dest: basePaths.dest + 'css/'
        }
    },
    blocks: {
        layout: {
            src: basePaths.blocks + '**/*.html',
            dest: basePaths.dest
        },
        styles: {
            src: basePaths.blocks + '**/*.less',
            dest: basePaths.dest + 'css/'
        }
    },

    images: {
        src: basePaths.blocks + '**/*.{jpg, jpeg, png, svg, gif}',
        dest: basePaths.dest + 'images/'
    },
    scripts: {
        src: basePaths.blocks + '**/*.js',
        dest: basePaths.dest + 'js/'
    },

    sprite: {
        src: basePaths.blocks + 'sprite/*'
    }
};


function changeEvent(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.blocks + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

function buildCss(src, name, dest) {
    return gulp.src(src, {
            base: '.'
        })
        .pipe(plugins.less())
        .on('error', function(err) {
            new gutil.PluginError('CSS', err, {
                showStack: true
            });
        })
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
        // .pipe(isProduction ? plugins.combineMediaQueries({
        //     log: true
        // }) : gutil.noop())
        // .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.concat(name))
        .pipe(plugins.size())
        .pipe(gulp.dest(dest));
}


gulp.task('clean:crate', function() {
    return del(basePaths.dest + '**/*.html');
});

gulp.task('clean:blocks', function() {
    return del([basePaths.temp + basePaths.blocks, basePaths.dest + basePaths.blocks]);
});

gulp.task('clean:content', function() {
    return del(basePaths.dest + '/content');
})

gulp.task('clean', ['clean:blocks', 'clean:templates', 'clean:blocks']);


gulp.task('build:blocks', ['clean:blocks'], function() {
    return gulp.src(paths.blocks.layout.src, {
            base: '.'
        })
        .pipe(plugins.filenames('blocks'))
        .pipe(plugins.frontMatter())
        .pipe(plugins.nunjucksHtml())
        .pipe(gulp.dest(basePaths.temp))
        .pipe(gulp.dest(paths.blocks.layout.dest));
});

function runContentBuild(filelist, cb) {
    var blocklist = plugins.filenames.get('blocks');
    console.log(blocklist);

    gulp.src(paths.crate.content.src)
        .pipe(plugins.debug())
        // .pipe(plugins.data(function(file) {
        //     return filelist;
        // }))
        .pipe(plugins.frontMatter({
            property: 'data',
            remove: true
        }))
        .pipe(plugins.markdown())
        .pipe(plugins.applyTemplate({
            engine: 'nunjucks',
            template: function(context) {
                // console.log(context);
                return context.data.layout;
            },
            context: function(file) {
                file.data.filelist = filelist;
                file.data.blocklist = blocklist;
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
        .pipe(gulp.dest(paths.crate.content.dest));
    cb();
}

gulp.task('build:content', ['clean:content', 'build:blocks'], function(cb) {

    glob(paths.crate.content.src, function(err, files) {
        console.log('fasdkhlf: ', files);
        files = files.map(function(file){
            var ext = path.extname(file);
            var basename = path.basename(file, ext);
            return {
                path: file,
                extname: ext,
                basename: basename,
                link: '/content/'+ basename+ '.html'
            }
        })
        console.log('>>>>: ', files);
        if (err) return cb(err);
        runContentBuild(files, cb);
    });
});


gulp.task('build:css:blocks', function() {
    return buildCss(paths.blocks.styles.src, blockCssOut, paths.blocks.styles.dest);
});


gulp.task('build:css:crate', function() {
    return buildCss(paths.crate.styles.src, crateCssOut, paths.crate.styles.dest);
});


gulp.task('webserver', ['build'], function() {
    return gulp.src(basePaths.dest)
        .pipe(plugins.webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('watch', ['build'], function() {
    gulp.watch([
        paths.crate.content.src,
        paths.crate.layout.src,
        paths.blocks.layout.src
    ], ['build']).on('change', changeEvent);

    gulp.watch([
        paths.blocks.styles.src,
        paths.crate.styles.src
    ], ['styles']).on('change', changeEvent);
    // gulp.watch(paths.scripts.src + '*.js', ['scripts']).on('change', function(evt) {
    //     changeEvent(evt);
    // });
    // gulp.watch(paths.sprite.src, ['sprite']).on('change', function(evt) {
    //     changeEvent(evt);
    // });
});

gulp.task('styles', ['build:css:blocks', 'build:css:crate']);

gulp.task('build', ['build:content', 'styles']);
gulp.task('serve', ['webserver']);
gulp.task('dev', ['build', 'webserver', 'watch']);
