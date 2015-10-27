/* jshint node: true */
'use strict';
var utils = require('core/shared/utils');
var $ = require('jquery');

module.exports = function() {
    utils.output('ff_module-title running!');
    $(function(){
        console.log('document ready');
    });
};
