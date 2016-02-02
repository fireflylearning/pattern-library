'use strict';

var _ = require('lodash-node'),
    path = require('path');

var createFile = require('./fileData');


function createBlock(name, resolvedname) {
    var _files = {},
        _meta = {},
        _dependencies = [],
        _data = [],
        _urlPath = path.join(resolvedname, name + '.html');

    function getFiles(ob, file, key) {
        ob[key] = file.getInfo();
        return ob;
    }

    var block = {
        addFile: function(name, resolvedname) {
            var file = this.getFile(name);
            if (file) {
                // console.log(fileInfo, name, name);
                // throw new Error('[Blockdata] File \'' + name + '\' already exists for block ' + name);
            } else {
                file = createFile(name, resolvedname);
                _files[name] = file;
            }

            return file;
        },
        addDependencies: function(dependencies) {
            if (!dependencies) return
            _dependencies = _.union(_dependencies, [].concat(dependencies));
            return this;
        },
        addMeta: function(meta) {
            if (!meta) return
            _meta = _.assign({}, _meta, meta);
            return this;
        },
        addData: function(data) {
            if (!data) return;
            _data = _.union(_data, [].concat(data));
            return this;
        },
        setUrlPath: function(urlPath){
            _urlPath = urlPath;
            return this;
        },
        getFile: function(name) {
            return _files[name];
        },
        getDependencies: function() {
            return [].concat(_dependencies);
        },
        getInfo: function() {
            return _.assign({}, {
                name: name,
                resolvedname: resolvedname,
                urlPath: _urlPath,
                files: _.reduce(_files, getFiles, {}),
                requires: this.getDependencies(),
                meta: this.getMeta(),
                data: this.getData()
            });
        },
        getMeta: function() {
            return _.assign({}, _meta);
        },
        getData: function() {
            if (_data && _data.length) return [].concat(_data);
            return _.assign({}, _data);
        },
        clearData: function(){
            _data = [];
        }
    };
    return block;
}

module.exports = function() {
    var blocks = {};

    function getBlock(name) {
        return blocks[name];
    }

    function getBlocks(names) {
        var blocklist = (names.length) ? _.map(names, getBlock) : blocks;

        return _.reduce(blocklist, function(arr, block) {
            arr.push(block.getInfo());
            return arr;
        }, []);
    }

    function getBlockListRequires(names) {
        var blocklist = (names.length) ? _.map(names, getBlock) : blocks;

        return _.reduce(blocklist, function(depsList, block) {
            depsList = _.union(depsList, block.getDependencies());
            return depsList;
        }, []);
    }

    function addBlock(name, resolvedname) {
        blocks[name] = createBlock(name, resolvedname);
        return blocks[name];
    }

    return {
        addBlock: function(name, resolvedname) {
            var block = getBlock(name) || addBlock(name, resolvedname);
            block.clearData();
            return block;
        },
        getBlock: function(name) {
            return getBlock(name);
        },
        getAllData: function( /* (optional) Array of names */ ) {
            var args = Array.prototype.slice.call(arguments);
            return getBlocks(args);
        },
        getBlocklistRequires( /* (optional) Array of names */ ) {
            var args = Array.prototype.slice.call(arguments);
            return getBlockListRequires(args);
        }
    };
};
