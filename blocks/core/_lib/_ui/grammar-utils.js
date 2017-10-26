'use strict'

// Only use if you know that the word is a simple plural
module.exports.simplePlural = function simplePlural(num, base) {
    return (num === 1) ? base : base + 's';
}
