function getPaths(mode) {
    'use strict';

    var base = {
        blocks: 'blocks/',
        crate: 'crate/',
        dest: 'wwwroot/',
        content: 'crate/content/',
        layout: 'crate/layout/',
        blocklist: 'blocks/**/*.xml'
    };

    var basePaths = {
        blocks: base.blocks,
        blocklist: base.blocklist,
        dest: base.dest,

        crate: base.crate,
        content: base.content,
        layout: base.layout,

        temp: '.tmp/',
        assets: 'assets/',
    };

    var paths = {
        temp: basePaths.temp,
        blocklist: basePaths.blocklist,
        dest: basePaths.dest,
        crate: {
            base: basePaths.crate,
            content: {
                base: basePaths.content,
                src: basePaths.content + '**/*.md',
                dest: basePaths.temp
            },
            layout: {
                base: basePaths.layout,
                src: [basePaths.layout + '**/*.xsl', '!' + basePaths.layout + 'src/**/*.xsl'],
                dest: basePaths.temp
            },
            styles: {
                src: [basePaths.crate+'less/base.less', basePaths.crate + '**/*.less'],
                dest: basePaths.dest + 'css/'
            }
        },
        blocks: {
            base: basePaths.blocks,
            html: {
                src: basePaths.blocks + '**/*.html',
                dest: basePaths.temp
            },
            styles: {
                src: [basePaths.blocks + '**/outputs.less', basePaths.blocks + '**/settings.less', basePaths.blocks + 'shared/**/*.less', basePaths.blocks + '**/*.less'],
                dest: basePaths.dest + 'css/'
            },
            xml: {
                src: basePaths.blocks + '**/*.xml',
                dest: basePaths.temp + basePaths.blocks
            },
            xsl: {
                src: basePaths.blocks + '**/*.xsl',
                dest: basePaths.temp + basePaths.blocks
            },
            scripts: {
                src: basePaths.blocks + '**/*.js',
                entry: './' + basePaths.blocks + 'index.js',
                output: './' + basePaths.dest + 'js/'
            }
        },
        clean: [basePaths.temp, basePaths.dest],
        lint: {
            styles: basePaths.dest + '**/*.css',
            scripts: basePaths.blocks + '**/*.js',
        },
        images: {
            src: basePaths.blocks + '**/*.{jpg, jpeg, png, svg, gif}',
            dest: basePaths.dest + 'images/'
        },

        assets: {
            src: basePaths.assets + '**/*',
            dest: basePaths.dest
        }
    };

    return paths;
}

module.exports = getPaths('x');
