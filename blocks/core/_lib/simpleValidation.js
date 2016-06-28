'use strict';

// Simple Validation rules: intended to be overridden on the app layer

module.exports.isRequired = function isRequired(value) {
    return value && value.length;
}

module.exports.isNumber = function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports.maxLength = function maxLength(max) {
    return function (value) {
        return value.length && value.length <= max;
    };
}
