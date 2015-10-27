var paths = require('./paths.js');

module.exports = {
    entry: {
        blocks: './blocks/core/index.js'
    },
    output: {
        path: paths.scripts.dest,
        filename: 'blocks.js',
    }
};
