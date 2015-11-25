'use strict';

var $ = require('jquery');

module.exports = function() {
    $(function() {
        console.log('doc ready');
        $('[data-component="date-picker"]').datepicker();
        $('[data-component="date-picker"]').datepicker('setDate', new Date);
        // datepicker('hide');
    });
};
