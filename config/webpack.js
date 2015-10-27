var paths = require('./paths.js');
var webpack = require('webpack');

module.exports = {
    entry: {
        blocks: './blocks/core/index.js'
    },
    output: {
        path: paths.scripts.dest,
        filename: '[name].js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src',  'blocks'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],
    externals: { jquery: 'jQuery' }
};
