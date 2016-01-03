'use strict';

var path = require('path');

function getPaths() {


    var basePaths = {
        blocks: 'blocks/',
        dest: 'wwwroot/',
        export: 'export/',

        crate: 'crate/',
        content: 'crate/content/',
        layout: 'crate/layout/',
        cssBuildPriority: [
            '**/outputs.less',
            '**/settings.less',
            '**/mixins.less',
            '**/_shared/**/*.less',
            '**/*.less'
        ],
        cssExportPriority: [
            '**/settings.less',
            '**/mixins.less',
            '**/_shared/**/*.less',
            '!**/_shared/**/outputs.less',
            '**/*.less',
            '!**/outputs.less',
        ],

        temp: '.tmp/',
        assets: 'assets/',
        icons: 'blocks/'
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
                src: [basePaths.layout + '**/*.*', '!' + basePaths.layout + 'src/**/*.*'],
                dest: basePaths.temp
            },
            styles: {
                src: [basePaths.crate + 'less/base.less', basePaths.crate + '**/*.less'],
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
                buildPriority: basePaths.cssBuildPriority,
                exportPriority: basePaths.cssExportPriority,
                src: basePaths.cssBuildPriority.map(function(cPath) {
                    return path.join(basePaths.blocks, cPath);
                }),
                dest: basePaths.dest + 'css/'
            },
            md: {
                src: basePaths.blocks + '**/*.md',
                dest: basePaths.temp + basePaths.blocks
            },
            xml: {
                src: [basePaths.blocks + '**/*.xml', '!' + basePaths.blocks + '**/_shared/**/*.xml'],
                dest: basePaths.temp + basePaths.blocks
            },
            xsl: {
                src: basePaths.blocks + '**/*.xsl',
                dest: basePaths.temp + basePaths.blocks
            },
            rt: {
                src: basePaths.blocks + '**/*.rt',
                dest: basePaths.blocks
            },
            scripts: {
                src: basePaths.blocks + '**/*.js',
                entry: './' + basePaths.blocks + 'core/_shared/index.js',
                output: './' + basePaths.dest + 'js/'
            }
        },
        clean: [basePaths.temp, basePaths.dest, basePaths.icons + '*/_icons/optimised_svgs/' ],
        export: basePaths.export,
        lint: {
            styles: basePaths.dest + '**/*.css',
            scripts: basePaths.blocks + '**/*.js',
        },
        images: {
            src: basePaths.blocks + '**/*.{jpg, jpeg, png, svg, gif}',
            dest: basePaths.dest + 'images/'
        },

        assets: {
            src: basePaths.assets + '**/*.*',
            dest: basePaths.dest
        },

        optimise_svgs: {
            base: basePaths.icons,
            src:  '_icons/original_svgs/*.svg',
            dest: '_icons/optimised_svgs',
        },

        icons: {
            base: basePaths.icons,
            src: '_icons/optimised_svgs/*.svg',
            dest: 'css',
            templates: 'crate/layout/icons/templates/default-css.hbs',
            previewTemplate: 'crate/layout/icons/templates/preview.hbs',
        }

    };

    return paths;
}

module.exports = getPaths('x');
