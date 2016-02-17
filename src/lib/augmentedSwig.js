'use strict';

var swig = require('swig'),
path = require('path');

function getBackupInfo(ext) {
    return {
        absolutePath: 'src/templates/default' + ext,
        relativePath: 'src/templates/default' + ext
    }
}

module.exports = function(blockData, pageData) {
    swig.setDefaults({
        cache: false
    });
    swig.setFilter('resourcePath', function(blockname, extname, type) {
        type = type || 'absolute';
        extname = extname || '';
        var path = '',
            file,
            fileInfo;
        // console.log('1 resourcePath', blockname, extname, path);
        if (!blockname) return path;

        var block = blockData.getBlock(blockname);

        fileInfo = getBackupInfo(extname);

        if (block) {
            // console.log('blockfile:', block.getFile(blockname + extname));
            file = block.getFile(blockname + extname);
            if (file) {
                fileInfo = file.getInfo();
            }
        }


        switch (type) {
            case 'absolute':
                path = fileInfo.absolutePath;
                break;
            case 'relative':
                path = fileInfo.relativePath;
                break;
        }

        // console.log('2 resourcePath', blockname, extname, path);
        return path;
    });

    swig.setFilter('urlPath', function(name, type) {
        var dataStore, data, fileInfo, urlPath = '/';

        switch (type) {
            case 'page':
                data = pageData.getFile(name);
                break;
            default:
                data = blockData.getBlock(name)
                break;
        }

        if (data) {
            fileInfo = data.getInfo();
            if (fileInfo) {
                urlPath = fileInfo.urlPath;
            }
        }
        // console.log('urlPath: ', data, name, fileInfo, urlPath);
        return urlPath;
    });

    swig.setFilter('jsUrlPath', function(name) {
        var jsEntry, block, fileInfo, jsUrlPath = '';


        block = blockData.getBlock(name)
        if (!block) return jsUrlPath;

        jsEntry = block.getJsEntry();
        if (jsEntry) {
            jsUrlPath = path.join('/js/', jsEntry.getInfo().name); //TODO: make path more robust
        }

        // console.log('urlPath: ', data, name, fileInfo, urlPath);
        return jsUrlPath;
    });

    swig.setFilter('jsEntry', function(name) {
        var jsEntry, block, fileInfo, jsUrlPath = '';


        block = blockData.getBlock(name)
        if (!block) return jsUrlPath;

        jsEntry = block.getJsEntry();
        if (jsEntry) {
            jsUrlPath = jsEntry.getInfo().name.replace('.js', ''); //TODO: make path more robust
        }

        // console.log('urlPath: ', data, name, fileInfo, urlPath);
        return jsUrlPath;
    });

    return swig;
};
