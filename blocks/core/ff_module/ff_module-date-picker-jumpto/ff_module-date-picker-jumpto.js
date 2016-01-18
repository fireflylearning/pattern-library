'use strict';
var $ = require('jquery');

module.exports = function() {
    $(function() {
        $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});
        return $('[data-ff="date-picker"]').each(function(index, element) {
            $(element).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function(date) {
                    if ($(element).attr("data-ff-target-input-id")) {
                        document.getElementById($(element).attr("data-ff-target-input-id")).value = date;
                    }
                    if ($(element).attr("data-ff-url-prefix")) {
                        location.href = $(element).attr("data-ff-url-prefix") + date;
                    }
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

                        ensureElementIsFullyContainedByWindow(inst.dpDiv);
                    }, 0);
                }
            })
        });

        function ensureElementIsFullyContainedByWindow(element) {
            var buffer = 20;
            var offset = element.offset();
            var bottom = offset.top + element.outerHeight();
            var right = offset.left + element.outerWidth();
            var boundingBox = {
                bottom: $(window).scrollTop() + $(window).height() - buffer,
                right: $(window).scrollLeft() + $(window).width() - buffer
            };

            if (bottom > boundingBox.bottom) {
                element.css({top: boundingBox.bottom - element.outerHeight()});
            }
            if (right > boundingBox.right) {
                element.css({left: boundingBox.right - element.outerWidth()});
            }
        }
    });

};
