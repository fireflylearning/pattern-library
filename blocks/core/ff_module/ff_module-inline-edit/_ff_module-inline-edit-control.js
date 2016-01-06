'use strict';

var $ = require('jquery');

function editControlStub(){
    return {
        startEdit: function(target){
            console.log('Start editing', target);
        },
        endEdit: function(target) {
            console.log('End editing', target);
        }
    };
}

module.exports = {
    getControl: editControlStub
};
