'use strict';
var webpack = require('webpack'),
    path = require('path');

var externals = {
        'jquery': {
            root: '$',
            commonjs2: 'jquery',
            commonjs: 'jquery',
            amd: 'jquery'
        },
        'lodash': {
            root: '_',
            commonjs2: 'lodash',
            commonjs: 'lodash',
            amd: 'lodash'
        },
        'underscore': {
            root: '_',
            commonjs2: 'underscore',
            commonjs: 'underscore',
            amd: 'underscore'
        },
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'react/addons': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
    },
    plugins = {
        jQuery: 'jquery',
        $: 'jquery',
        _: 'underscore'
    },
    loaders = [{
        test: /\.jsx?$/,
        exclude: /(node_modules|assets|tests)/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'es2015'],
            // cacheDirectory: true,    // This caused intermittent (and silent) build failures, revisit if starts to get too slow
            plugins: ['transform-runtime']
        }
    }, {
        test: /\.js?$/,
        exclude: /(node_modules|assets|tests)/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'es2015'],
            plugins: ['transform-runtime']
        }
    }];

module.exports = function(paths, config) {
    return {
        develop: {
            entry: {
                blocks: paths.blocks.scripts.entry
            },
            cache: false,
            module: {
                loaders: loaders
            },
            output: {
                path: paths.blocks.scripts.output,
                filename: "[name].js",
                library: ["ffBlocks", "[name]"],
                libraryTarget: 'umd'
            },
            resolve: {
                modulesDirectories: ['node_modules', 'src', 'blocks'],
            },
            devtool: config.isProduction ? false : 'source-map',
            plugins: [
                new webpack.ProvidePlugin(plugins)
            ],
            externals: externals
        },
        export: {
            entry: {
                blocks: './.tmp/js/blocks-export.js'
            },
            cache: false,
            module: {
                loaders: loaders
            },
            output: {
                path: path.join(config.exportPath, 'js'),
                filename: '[name].js',
                library: 'ffBlocks',
                libraryTarget: 'umd'
            },
            resolve: {
                modulesDirectories: ['./node_modules', 'src', './blocks'],
            },
            plugins: [
                new webpack.ProvidePlugin(plugins)
            ],
            externals: externals
        }
    };

};
