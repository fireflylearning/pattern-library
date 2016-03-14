'use strict';

function isDateObject(sent){
    return (typeof sent === 'object' && typeof(sent.getTime) === 'function');
}

function isValidDateString(sent){
    return (typeof sent === 'string' && !isNaN(Date.parse(sent)));
}

function ensureIsDate(sent) {
    if (isDateObject(sent)) {
        return sent;
    } else if (isValidDateString(sent)) {
        return new Date(sent);
    }
    return null;
}

module.exports.isDateObject = isDateObject;
module.exports.isValidDateString = isValidDateString;
module.exports.ensureIsDate = ensureIsDate;
