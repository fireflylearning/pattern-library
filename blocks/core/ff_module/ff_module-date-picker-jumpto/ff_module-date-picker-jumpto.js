'use strict';
var $ = require('jquery');

module.exports = function() {
    $(function() {
        $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});
        return $('[data-ff="date-picker"]').each(function(index, element) {
            var valueFormat = "yy-mm-dd";
            
            var displayElement = $(document.getElementById($(element).attr("data-ff-target-input-id")));
            if (displayElement) {
                var displayFormat = $(element).attr("data-ff-display-format") || valueFormat;
                var valueElement = $("<input type='hidden'>");
                valueElement.attr("name", displayElement.attr("name"));
                displayElement.attr("name", null);
                displayElement.after(valueElement);
                
                updateTarget(displayElement.val());
            }
            
            function updateTarget(date) {
                valueElement.val(date);
                var displayDate = $.datepicker.formatDate(displayFormat, new Date(date));
                displayElement.val(displayDate);
            }
            
            $(element).datepicker({
                dateFormat: valueFormat,
                onSelect: function(date) {
                    if (displayElement)) {
                        updateTarget(date);
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