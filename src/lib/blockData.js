'use strict';

var _ = require('lodash'),
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
            if (!file) {
                file = createFile(name, resolvedname);
                _files[name] = file;
            }

            return file;
        },
        addDependencies: function(dependencies) {
            if (!dependencies) return this;
            _dependencies = _.union(_dependencies, [].concat(dependencies));
            return this;
        },
        addMeta: function(meta) {
            if (!meta) return this;
            _meta = _.assign({}, _meta, meta);
            return this;
        },
        addData: function(data) {
            if (!data) return this;
            _data = _.union(_data, [].concat(data));
            return this;
        },
        setUrlPath: function(urlPath) {
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
        getJsEntry: function() {
            if (_.isEmpty(_files)) return null;

            var file = _.find(_files, function(file) {
                var fileName = file.getInfo().name,
                    rendererTest = /^_([\w-]+)-renderer\.js$/,
                    hasRenderer = rendererTest.test(fileName),
                    hasJs = name + '.js' === fileName;
                // console.log(fileName, hasRenderer, hasJs);
                return hasRenderer || hasJs;

            });

            // console.log(file);
            return file;
        },
        clearData: function() {
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

    function getBlockListFromArgs(names) {
        return (names && names.length) ? _.map(names, getBlock) : blocks;
    }

    function getBlockNameListFromArgs(names) {
        return (names && names.length) ? names : blocks.map(function(block) {
            return block.name;
        });
    }

    function getBlocks(names) {
        var blocklist = getBlockListFromArgs(names);

        return _.reduce(blocklist, function(arr, block, index) {
            try {
                arr.push(block.getInfo());
                return arr;
            } catch (e) {
                throw new Error('Block named \'' + names[index] + '\' could not be found');
            }
        }, []);
    }

    function getBlockListRequires(names) {
        var initialList = getBlockNameListFromArgs(names);
        var blocklist = getBlockListFromArgs(names);

        return _.difference(_.reduce(blocklist, function(depsList, block, index) {
            try {
                depsList = _.union(depsList, block.getDependencies());
                return depsList;
            } catch (e) {
                throw new Error('Block named \'' + names[index] + '\' could not be found');
            }
        }, []), initialList);
    }

    function getJsEntries(names) {
        var blocklist = getBlockListFromArgs(names);

        return _.reduce(blocklist, function(arr, block, index) {
            try {
                var entryFile = block.getJsEntry();
                if (entryFile) arr.push(entryFile);
                return arr;
            } catch (e) {
                throw new Error('Block named \'' + names[index] + '\' could not be found');
            }

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
            return getBlocks(args[0]);
        },
        getBlocklistRequires( /* (optional) Array of names */ ) {
            var args = Array.prototype.slice.call(arguments);
            return getBlockListRequires(args[0]);
        },
        getJsEntries() {
            var args = Array.prototype.slice.call(arguments);
            return getJsEntries(args[0]);
        }
    };
};
