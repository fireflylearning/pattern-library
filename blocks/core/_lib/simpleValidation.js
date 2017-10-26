'use strict';
import _ from 'underscore';
import { excludedFileTypes, maxFileSize, maxFileCount } from './validationConstants.js';

// Simple Validation rules: intended to be overridden on the app layer

var isEmpty = function(value) {
    return value == null || value === '';
};

module.exports.isRequired = function isRequired(value) {
    if (typeof value === 'number')
        return !!value || value === 0;

    return !!value && !!value.length;
};

module.exports.isNumber = function isNumber(value) {
    return isEmpty(value) || (!isNaN(parseFloat(value)) && isFinite(value));
};

module.exports.isPositiveIntegerIfSet = function isPositiveIntegerIfSet(value) {
    return isEmpty(value) || /^[0-9]+$/.test(String(value));
};

module.exports.maxLength = function maxLength(max) {
    return function (value) {
        return value == null
            || (!isNaN(value.length) && value.length <= max);
    };
};

function getInvalidFileExtensions(files) {
    if (isEmpty(files))
        return [];

    let invalidFileExtensions = [];
    
    for (var i = 0; i < files.length; i++) {
        let fileName = files[i].name;
        let fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        
        if (_.contains(excludedFileTypes, fileExtension))
            invalidFileExtensions.push(fileExtension);
    }

    invalidFileExtensions = _.uniq(invalidFileExtensions);

    return invalidFileExtensions;
}
module.exports.getInvalidFileExtensions = getInvalidFileExtensions;

module.exports.isValidFileExtensionIfSet = function isValidFileExtensionIfSet(files) {
    if (isEmpty(files))
        return true;

    let invalidFileExtensions = getInvalidFileExtensions(files);

    return {
        valid: invalidFileExtensions.length === 0,
        invalidFileExtensions: invalidFileExtensions
    };
};

module.exports.isNotTooLargeIfSet = function isNotTooLargeIfSet(files) {
    if (isEmpty(files))
        return true;

    for (var i = 0; i < files.length; i++) {
        if (files[i].size > maxFileSize)
            return false;
    }
    
    return true;
}

module.exports.isAppropriateFileCountIfSet = function isAppropriateFileCountIfSet(files, currentCount) {
    if (isEmpty(files))
        return true;

    return files.length + currentCount <= maxFileCount;
}
