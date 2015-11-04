var paths = require('./paths.js');
var webpack = require('webpack');

module.exports = {
    entry: {
        blocks: paths.blocks.scripts.entry
    },
    output: {
        path: paths.blocks.scripts.output,
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
