'use strict';


var _ = require('lodash-node'),
    path = require('path'),
    gutil = require('gulp-util');

function createFile(name, filepath) {
    var _name = name,
        _resolvedname = filepath,
        _meta = {},
        _data = [],
        _content = '',
        _relativePath = path.relative(process.cwd(), filepath),
        _absolutePath = filepath,
        _urlPath = gutil.replaceExtension(filepath, '.html');

    return {
        addData: function(data) {
            if (!data) return;
            _data = data;
            return this;
        },
        addMeta: function(meta) {
            if (!meta) return;
            _meta = meta;
            return this;
        },
        addContent: function(content) {
            if (!content) return;
            _content = content;
            return this;
        },
        setUrlPath: function(urlPath){
            _urlPath = urlPath;
            return this;
        },
        getData: function() {
            return _data;
        },
        getMeta: function() {
            return _meta;
        },
        getContent: function(){
            return _content;
        },
        getAbsolutePath: function(){
            return _absolutePath;
        },
        getInfo: function() {
            return {
                name: _name,
                resolvedname: _resolvedname,
                meta: _meta,
                data: _data,
                content: _content,
                relativePath: _relativePath,
                absolutePath: _absolutePath,
                urlPath: _urlPath
            }
        }
    }
}

module.exports = createFile;
