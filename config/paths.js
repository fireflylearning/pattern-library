/* jshint node: true */
'use strict';

function getPaths(mode) {

    var base = {
        blocks: 'blocks/',
        crate: 'crate/',
        dest: 'wwwroot/',
        content: 'crate/content/',
        layout: 'crate/layout/',
        blocklist: 'blocks/' + '**/*.xml'
    };

    var basePaths = {
        blocks: base.blocks,
        blocklist: base.blocklist,
        dest: base.dest,

        crate: base.crate,
        content: base.content,
        layout: base.layout,

        assets: 'assets/',
    };

    var paths = {
        temp: '.tmp/',
        blocklist: basePaths.blocklist,
        crate: {
            base: basePaths.crate,
            content: {
                base: basePaths.content,
                src: basePaths.content + '**/*.md',
                dest: basePaths.dest
            },
            layout: {
                base: basePaths.layout,
                src: [basePaths.layout + '**/*.xsl', '!' + basePaths.layout + 'src/**/*.xsl'],
                dest: basePaths.dest
            },
            styles: {
                src: basePaths.crate + '**/*.less',
                dest: basePaths.dest + 'css/'
            }
        },
        blocks: {
            base: basePaths.blocks,
            html: {
                src: basePaths.blocks + '**/*.html',
                dest: basePaths.dest
            },
            styles: {
                src: basePaths.blocks + '**/*.less',
                dest: basePaths.dest + 'css/'
            },
            xml: {
                src: basePaths.blocks + '**/*.xml',
                dest: basePaths.dest + basePaths.blocks
            },
            xsl: {
                src: basePaths.blocks + '**/*.xsl',
                dest: basePaths.dest + basePaths.blocks
            },
            scripts: {
                entry: './' + basePaths.blocks + 'index.js',
                output: './' + basePaths.dest + 'js/'
            }
        },
        dest: {
            base: basePaths.dest,
            layout: basePaths.dest + '**/*.html',
            pages: basePaths.dest + 'pages',
            xml: basePaths.dest + '**/*.xml',
            xsl: basePaths.dest + '**/*.xsl',
            styles: basePaths.dest + '**/*.css',
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
