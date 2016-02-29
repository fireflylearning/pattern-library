'use strict';

var _ = require('lodash'),
    path = require('path'),
    createFile = require('./fileData');

module.exports = function() {

    var files = {};

    function getFile(name) {
        return files[name];
    }

    function getFiles(names) {
        var filelist = (names.length) ? _.map(names, getFile) : files;

        return _.reduce(filelist, function(arr, file) {
            arr.push(file.getInfo());
            return arr;
        }, []);
    }

    // function getFileListRequires(names) {
    //     var filelist = (names.length) ? _.map(names, getFile) : files;

    //     return _.reduce(filelist, function(depsList, block) {
    //         depsList = _.union(depsList, block.getDependencies());
    //         return depsList;
    //     }, []);
    // }

    function addFile(name, resolvedname) {
        files[name] = createFile(name, resolvedname);
        return files[name];
    }

    return {
        addFile: function(name, resolvedname) {
            var block = getFile(name) || addFile(name, resolvedname);
            return block;
        },
        getFile: function(name) {
            return getFile(name);
        },
        getAllData: function( /* (optional) Array of names */ ) {
            var args = Array.prototype.slice.call(arguments);
            return getFiles(args);
        }
    };
};
