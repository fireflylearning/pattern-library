'use strict';

var $ = require('jquery');

function helpControlStub(){
    return {
        openHelp: function(target){
            console.log('Open help', target);
        },
        closeHelp: function(target) {
            console.log('Close help', target);
        },
        getTarget: function(selector) {
            return $(selector).get(0);
        }
    };
}

module.exports = {
    getControl: helpControlStub
};
