'use strict';

var utils = require('../../../shared/utils');
var $ = require('jquery');

module.exports = function() {
    utils.output('ff_module-title running!');
    $(function(){
        console.log('document ready');
        $('.ff_module-title').click(function(){
            console.log('here clicky clicky');
        });
    });
};
