'use strict';

var $ = require('jquery');

module.exports = function() {
    $(function() {
        $('[data-component="date-picker"]').each(function(index,element) {
           $(element).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function(date) {
                    location.href = $(element).attr("data-url-prefix") + date;
                }
            }); 
        });
    });
};
