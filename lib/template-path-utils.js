/* jshint node: true */
'use strict';

var path = require('path');

var _root = path.join(__dirname),
_layoutBase = '';

function getAbsPath(layoutpath) {
    var p = path.relative(_root, layoutpath);
    return p;
}

function getGenPath(name, ext, type) {
    ext = ext || '.xml';
    var layoutroot = path.join(_root, _layoutBase, 'src', type);
    var layoutpath = path.join(layoutroot, name + ext);
    return layoutpath;
}

function getContentLayoutRootPath(layoutname, ext) {
    return getAbsPath(getGenPath(layoutname, ext, 'pages'));
}

function getBlockLayoutRootPath(layoutname, ext) {
    return getAbsPath(getGenPath(layoutname, ext, 'blocks'));
}


module.exports = function(root, layoutBase) {
    _root = root || _root;
    _layoutBase = layoutBase || _layoutBase;
    return {
        getContentLayoutRootPath: getContentLayoutRootPath,
        getBlockLayoutRootPath: getBlockLayoutRootPath
    };
};
