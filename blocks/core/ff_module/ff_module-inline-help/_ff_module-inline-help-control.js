'use strict';

var $ = require('jquery');

function helpControlStub(){
    return {
        openHelp: function(target){
            console.log('Open help', target);
        },
        closeHelp: function(target) {
            console.log('Close help', target);
        }
    };
}

module.exports = {
    getControl: helpControlStub
};
