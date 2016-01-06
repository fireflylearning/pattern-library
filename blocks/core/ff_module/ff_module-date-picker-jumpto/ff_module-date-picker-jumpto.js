'use strict';
var $ = require('jquery');

module.exports = function() {
    $(function() {
        $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});
        return $('[data-ff="date-picker"]').each(function(index, element) {
            $(element).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function(date) {
                    location.href = $(element).attr("data-ff-url-prefix") + date;
                },
                beforeShow: function(input, inst) {
                    $(inst.dpDiv).addClass('ff_module-date-picker-calendar');
                    setTimeout(function () {
                        var curr_left = inst.dpDiv.css('left');
                        var curr_right = inst.dpDiv.css('right');

                        var new_left = 30 + parseInt(curr_left);
                        var new_right = 30 + parseInt(curr_right);

                        console.log(new_left,new_right);

                        if(curr_left != 'auto') {inst.dpDiv.css('left',new_left);}
                        if(curr_right != 'auto') {inst.dpDiv.css('right',new_right);}
                    }, 0);
                }
            })
        });
    });

};