'use strict';

var path = require('path'),
    _ = require('lodash-node'),
    util = require('util');

function convertToPage(blockInfo) {
    return {
        page: _.merge({}, blockInfo.meta, {
            name: blockInfo.name,
            urlPath: blockInfo.urlPath,
            blocks: [blockInfo]
        }),
        requires: blockInfo.requires,
        data: blockInfo.data
    }
}

module.exports = function(blockData, siteData, swig) {

    function getBlockFileContext(file) {
        var fsInfo = path.parse(file.path);
            // console.log('[mdToXsltBlocks]',fsInfo.name);
            var block = blockData.getBlock(fsInfo.name),
            blockInfo = block.getInfo();

        var blockContext = _.merge(convertToPage(blockInfo),{
            // contents: file.contents.toString(),
            site: siteData.getMeta(),
            cache: false
        });
        blockContext.page.contents = file.contents.toString();
        blockContext.site.blocks = blockData.getAllData();

        return blockContext;
    }

    var xsltTapBlocks = {
        xslTemplatePath: function getXSLTemplatePath(file, context) {
            return path.join('src', 'templates', 'block-template.xsl');
        },
        xmlTemplatePath: function getXMLTemplatePath(file, context) {
            return path.join('src', 'templates', 'block-template.xml');
        },
        renderer: swig,
        fileContext: getBlockFileContext,
        debug: true
    };

    return xsltTapBlocks;
}
