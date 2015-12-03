'use strict';

var $ = require('jquery');

function editControlStub(){
    return {
        startEdit: function(target){
            console.log('Start editing', target);
        },
        endEdit: function(target) {
            console.log('End editing', target);
        },
        getTarget: function(selector) {
            return $(selector).get(0);
        }
    };
}

module.exports = {
    getControl: editControlStub
};
