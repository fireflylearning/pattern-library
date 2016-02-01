'use strict';

module.exports = function(metaData) {
    var _blockData,
        _pageData,
        _metaData = metaData;

    return {
        setBlocks: function(blockData) {
            if (!blockData) return;
            _blockData = blockData;
        },
        getBlocks: function() {
            return _blockData;
        },
        setMeta: function(metaData) {
            if (!metaData) return;
            _metaData = metaData;
        },
        getMeta: function() {
            return _metaData;
        },
        setPages: function(pageData) {
            if (!pageData) return;
            _pageData = pageData;
        },
        getPages: function() {
            return _pageData;
        }
    }
}
