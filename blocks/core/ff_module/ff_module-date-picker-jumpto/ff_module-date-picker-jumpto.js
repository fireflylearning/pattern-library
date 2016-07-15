'use strict';
var $ = require('jquery');
var docVal = (typeof window !== 'undefined' && window.document) ? window.document : 'document';

var _options = {
    root: docVal,
    selector: 'data-ff=date-picker',
    displayElement: 'data-ff-target-input-id',
}

function activateDatePickerJumpTo(options) {

    $.extend($.datepicker,{_checkOffset: function(inst, offset, isFixed){return offset}});

    return $('['+options.selector+']', options.root).each(function(index, element) {
        
        var valueFormat = "yy-mm-dd";
        var displayElement = $(document.getElementById( $(element).attr(options.displayElement)) );

        if (displayElement) {
            var displayFormat = $(element).attr("data-ff-display-format") || valueFormat;
            var valueElement = $("<input type='hidden'>");                
            valueElement.attr("name", displayElement.attr("name"));
            displayElement.attr("name", null);
            displayElement.after(valueElement);
            updateTarget(displayElement.val());
        }
        
        function updateTarget(date) {
            if (!isNaN(Date.parse(date))) {
                valueElement.val(date);
                var displayDate = $.datepicker.formatDate(displayFormat, new Date(date));
                displayElement.val(displayDate);
                options.onChangeDueDate(displayDate);
            }
        }
        
        var sel = (options.inlineContainer) ? options.inlineContainer : element;

        $(sel).datepicker({
            dateFormat: valueFormat,
            onSelect: function(date) {
                if (displayElement) {
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
                    var curr_top = inst.dpDiv.css('top');

                    var new_left = 50 + parseInt(curr_left);
                    var new_right = 50 + parseInt(curr_right);
                    var new_top = parseInt(curr_top) - 40;
                    
                    // console.log(new_left,new_right);

                    if(curr_left != 'auto') {inst.dpDiv.css({'left': new_left, 'top': new_top, 'z-index': 5});}
                    if(curr_right != 'auto') {inst.dpDiv.css({'right': new_right, 'top': new_top, 'z-index': 5});}

                    ensureElementIsFullyContainedByWindow(inst.dpDiv);
                }, 0);
            }
        });
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
}

module.exports = function(options) {
    options = $.extend({}, _options, options);
    $(function() {
        activateDatePickerJumpTo(options);
    });
};
