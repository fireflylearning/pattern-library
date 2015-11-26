'use strict';

var $ = require('jquery');

module.exports = function() {
    $(function() {
        $('[data-component="date-picker"]').datepicker();
        $('[data-component="date-picker"]').datepicker('setDate', new Date);
        // datepicker('hide');
    });
};
