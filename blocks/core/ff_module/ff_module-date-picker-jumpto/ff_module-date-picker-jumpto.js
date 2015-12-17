'use strict';
var $ = require('jquery');

module.exports = function() {
    $(function() {
        return $('[data-ff="date-picker"]').each(function(index, element) {
            $(element).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function(date) {
                    location.href = $(element).attr("data-ff-url-prefix") + date;
                }
            });
        });
    });

};
