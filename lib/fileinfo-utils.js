/* jshint node: true */
'use strict';

var path = require('path'),
    _ = require('lodash-node'),
    gutil = require('gulp-util');

var _root = path.join(__dirname),
    _site;

function getFileInfo(file, relativeFrom, relativeTo) {
    relativeTo = relativeTo || file.path;
    relativeFrom = relativeFrom || _root;
    var ext = path.extname(file.path),
        dirname = path.dirname(file.path),
        basename = path.basename(file.path, ext),
        relpath = path.relative(relativeFrom, relativeTo),
        basepath = path.relative(_root, path.join(dirname, basename));
    return {
        basename: basename,
        basepath: basepath,
        path: relpath,
        url: '/' + gutil.replaceExtension(relpath, '.html'),
    };
}



function getBlockInfo(file) {
    return file.page.blocks[0];
}

function getBasePageInfo(file) {
    return {
        info: file.info,
        page: {
            title: file.page.title
        }
    };
}

function getDataForFile(file, srclist) {
    var fileInfo = getFileInfo(file);
    var fileData = srclist.filter(function(page) {
        if (page.info.basename === fileInfo.basename) return true;
        return false;
    });

    fileData = fileData.length ? fileData[0] : {
        info: fileInfo,
        site: {}
    };

    var blockSet = _.map(_site.blocks, getBlockInfo);
    var pageSet = _.map(_site.pages, getBasePageInfo);

    fileData.site.blocks = blockSet;
    fileData.site.pages = pageSet;

    // TODO: Obtain from fs!
    fileData.site.themes = [{
        name: 'Core',
        filepath: '/css/blocks.core.css'
    }, {
        name: 'Melody',
        filepath: '/css/blocks.melody.css'
    }];

    return fileData;
}

function getContentByBasename(basename, datalist, selection) {
    selection = selection || ['info', 'site', 'page', 'data'];
    if (!datalist) return null;
    if (!basename) return null;
    var data = _.filter(datalist, function(item) {
            return item.info.basename === basename;
        })
        .map(function(item) {
            return _.pick(item, selection);
        });

    return data.length ? data[0] : null;
}

function normaliseBlocks(blocks, blocklist, selection) {
    if (!blocks) return [];
    blocklist = blocklist || _site.blocks;
    var nb = [];
    selection = selection || ['site', 'page', 'info', 'data', 'requires'];

    blocks.forEach(function(block) {
        if (_.isObject(block)) {
            for (var name in block) {
                var bd = getContentByBasename(name, blocklist, selection);
                if (bd) {
                    nb.push(_.merge({}, bd, {
                        data: [].concat(block[name])
                    }));
                }
            }
        } else if (_.isString(block)) {
            nb.push(getContentByBasename(block, blocklist, selection));
        }
    });
    return nb;
}

function getDataForBlocks(file) {
    return getDataForFile(file, _site.blocks);
}

function getDataForPages(file) {
    return getDataForFile(file, _site.pages);
}

function getFileRequires(file) {
    var fileData = file.data;
    var reqs = fileData.requires;
    var nReqs = normaliseBlocks(reqs, _site.blocks, ['info']);
    fileData.requires = nReqs;
    return fileData;
}

module.exports = function(site, root) {
    if (!site) {
        throw new Error('Fileinfo-util requires the \'site\' parameter');
    }
    _root = root || _root;
    _site = site;

    return {
        getDataForBlocks: getDataForBlocks,
        getDataForPages: getDataForPages,
        getFileRequires: getFileRequires,
        normaliseBlocks: normaliseBlocks,
        getFileInfo: getFileInfo
    };
};
