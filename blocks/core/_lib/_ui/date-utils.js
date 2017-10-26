'use strict';

function isDateObject(sent){
    return (typeof sent === 'object' && typeof(sent.getTime) === 'function');
}

function isValidDateString(sent){
    var regexp = /^([0-9]{4}-[0-9]{2}-[0-9]{2}).*$/;
    return (typeof sent === 'string' && regexp.test(sent) && !isNaN(Date.parse(sent)));
}

function ensureIsDate(sent) {
    if (isDateObject(sent)) {
        return sent;
    } else if (isValidDateString(sent)) {
        return new Date(sent);
    }
    return null;
}

function convertToDateObjectIfDateString(value) {
    if (isDateObject(value)) {
        return value;
    } else if (isValidDateString(value)) {
        return new Date(value);
    }
    return value;
}

function applyDateFormatting(dateString, toDateString) {
    var asDateIfDate = convertToDateObjectIfDateString(dateString);
    return isDateObject(asDateIfDate) ? toDateString(asDateIfDate) : dateString;
}

module.exports.isDateObject = isDateObject;
module.exports.isValidDateString = isValidDateString;
module.exports.ensureIsDate = ensureIsDate;
module.exports.convertToDateObjectIfDateString = convertToDateObjectIfDateString;
module.exports.applyDateFormatting = applyDateFormatting;
