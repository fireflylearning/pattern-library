'use strict';
var webpack = require('webpack'),
    path = require('path');

module.exports = function(paths, config) {
    return {
        develop: {
            entry: {
                blocks: paths.blocks.scripts.entry
            },
            cache: false,
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                    query: {
                        presets: ['react', 'es2015'],
                        cacheDirectory: true,
                        plugins: ['transform-runtime']
                    }
                }]
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
            devtool: config.isProduction ? false : 'eval-source-map',
            plugins: [
                new webpack.ProvidePlugin({
                    jQuery: 'jquery',
                    $: 'jquery',
                    _: 'underscore'
                })
            ],
            externals: {
                jquery: 'jQuery',
                react: 'React',
                'react/addons': 'React',
                'react-dom': 'ReactDOM',
                lodash: '_',
                underscore: '_'
            }
        },
        export: {
            entry: {
                blocks: './.tmp/js/blocks-export.js'
            },
            cache: false,
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                    query: {
                        presets: ['react', 'es2015'],
                        cacheDirectory: true,
                        plugins: ['transform-runtime']
                    }
                }]
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
                new webpack.ProvidePlugin({
                    jQuery: 'jquery',
                    $: 'jquery',
                    React: 'react',
                    _: 'underscore'
                })
            ],
            externals: {
                jquery: 'jQuery',
                react: 'React',
                'react/addons': 'React',
                lodash: '_',
                underscore: '_'
            }
        }
    };

};
