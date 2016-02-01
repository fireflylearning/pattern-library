'use strict';

var config = {},
    _ = require('lodash-node'),
    options, locals, getWebpackOptions, paths;

options = require('./options.default.js');
getWebpackOptions = require('./webpack.js');
paths = require('./paths.js');

try {
    locals = require('./options.local.js');
} catch (e) {}

config = _.assign({}, options, locals);

config.exportPath = config.exportPath || paths.export;
config.paths = paths;
config.site = require('./site.js');
config.gulpicon = require('./icons.js');
config.webpack = getWebpackOptions(paths, config);

module.exports = config;
