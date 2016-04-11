'use strict';

var activateDropdowns = require('../../ff_module-dropdown-button/ff_module-dropdown-button');

module.exports = function(){
    document.addEventListener("DOMContentLoaded", function() {
        activateDropdowns();
    });
};
