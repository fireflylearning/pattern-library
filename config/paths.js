'use strict';

var path = require('path');

function getPaths() {

    var basePaths = {
        dest: 'wwwroot/',
        pages: 'pages/',
        blocks: 'blocks/',
        core: 'core/',
        export: 'export/',
        assets: 'assets/',
        temp: '.tmp/',
        icons: '.icons/',
        templates: 'src/templates',
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
        blockSrcs: ['**/*.md', '**/*.xsl', '**/*.xml']
    };
    var paths = {
        export: basePaths.export,
        clean: [basePaths.temp, basePaths.dest],
        dest: basePaths.dest,
        pages: {
            xslt: {
                src: path.join(basePaths.pages, '**/*.md'),
                dest: path.join(basePaths.dest)
            },
            styles: {
                src: [path.join(basePaths.pages, 'less', 'base.less'), path.join(basePaths.pages, 'less', '**/*.less')],
                dest: path.join(basePaths.dest, 'css/')
            },
            watch: [path.join(basePaths.pages, '**/*.md')],
            templates: {
                watch: path.join(basePaths.templates, '**/*.{xsl,xml}')
            },
        },
        blocks: {
            dir: basePaths.blocks,
            xslt: {
                src: path.join(basePaths.blocks, basePaths.core, '**/*.md'),
                dest: path.join(basePaths.dest, basePaths.blocks, basePaths.core)
            },
            export: {
                src: [path.join(basePaths.blocks + '**/*.xsl'), '!' + basePaths.blocks + '**/lib_test/**/*.xsl'],
                dest: basePaths.export+basePaths.blocks
            },
            scripts: {
                src: [basePaths.blocks + '**/*.js', basePaths.blocks + '**/*.jsx'],
                entry: './' + basePaths.blocks + 'core/_shared/index.js',
                output: './' + basePaths.dest + 'js/'
            },
            styles: {
                buildPriority: basePaths.cssBuildPriority,
                exportPriority: basePaths.cssExportPriority,
                dest: path.join(basePaths.dest, 'css/'),
                watch: basePaths.cssBuildPriority.map(function(cPath) {
                    return path.join(basePaths.blocks, cPath);
                })
            },
            rt: {
                src: basePaths.blocks + '**/*.rt',
                dest: basePaths.blocks
            },
            watch: basePaths.blockSrcs.map(function(src) {
                return path.join(basePaths.blocks, basePaths.core, src)
            })
        },
        icons: {
            //relative to each theme folder
            cache: basePaths.icons,
            optimise: {
                srcDir: basePaths.blocks,
                destDir: path.join(basePaths.icons, 'optimised_svgs'),
                src: '_icons/original_svgs/*.svg',
                dest: '',
            },
            //relative to each theme folder
            grumpicon: {
                srcDir: path.join(basePaths.icons, 'optimised_svgs'),
                destDir: basePaths.icons,
                src: '*.svg',
                dest: 'build',
                templates: 'crate/layout/icons/templates/default-css.hbs',
                previewTemplate: 'crate/layout/icons/templates/preview.hbs',
            },
            copy: {
                src: [basePaths.icons+'build/**/*'],
                dest: basePaths.dest + 'css/icons'
            },
            export: {
                src: [basePaths.icons+'build/**/*.{js,css,png}'], // Must have no spaces between commas in curly brackets!
            }
        },
        assets: {
            src: basePaths.assets + '**/*.*',
            dest: basePaths.dest,
            export: basePaths.assets + '**/*.{png,gif,svg,jpeg,jpg}',
        }
    };

    return paths;
}

module.exports = getPaths('x');
