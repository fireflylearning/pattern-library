'use strict';
var webpack = require('webpack');

module.exports = function(paths, options) {
    return {
        entry: {
            blocks: paths.blocks.scripts.entry
        },
        cache:false,
        output: {
            path: paths.blocks.scripts.output,
            filename: '[name].js'
        },
        resolve: {
            modulesDirectories: ['node_modules', 'src', 'blocks'],
        },
        devtool: options.isProduction ? false : 'eval-source-map',
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            })
        ],
        externals: {
            jquery: 'jQuery'
        }
    };
};
