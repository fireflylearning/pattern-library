/* jshint node: true */
'use strict';
var utils = require('../../shared/utils');
var $ = require('../../../../src/vendor/js/jquery-1.11.3.js');

module.exports = function() {
    utils.output('ff_module-title running');
    $(function(){
        console.log('document ready');
    });
};
