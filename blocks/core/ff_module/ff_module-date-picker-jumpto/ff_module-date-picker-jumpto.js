'use strict';
var $ = require('jquery');
var docVal = (typeof window !== 'undefined' && window.document) ? window.document : 'document';

var _options = {
    root: docVal,
    selector: 'data-ff=date-picker',
    displayElement: 'data-ff-target-input-id',
    containerSelector: 'data-ff=date-picker-container',
    containerActiveClass: 'ff_module-date-picker-jumpto--is-active'
}

$(window).resize(function() {
      var field = $(document.activeElement);
      if (field.is('.hasDatepicker')) {
            field.datepicker('hide');
      }
});

function activateDatePickerJumpTo(options) {

    $.extend($.datepicker,{_checkOffset: function(inst, offset, isFixed){return offset}});

    return $('['+options.selector+']', options.root).each(function(index, element) {

        var valueFormat = "yy-mm-dd",
            findEl = document.getElementById($(element).attr(options.displayElement)),
            displayElement = (findEl) ? $(findEl) : null;

        if (displayElement) {
            var displayFormat = $(element).attr("data-ff-display-format") || valueFormat,
                valueElement = $("<input type='hidden'>"),
                nameAtt = displayElement.attr("name").slice(0, -1);

            valueElement.attr("name", nameAtt).attr("id", nameAtt);
            displayElement.after(valueElement);
            updateTarget(displayElement.val());
        }

        function updateTarget(date) {
            if (!isNaN(Date.parse(date))) {
		var UTCDate = getFullUTCDate(new Date(date));
                valueElement.val(UTCDate);
                var displayDate = $.datepicker.formatDate(displayFormat, new Date(UTCDate));
                if(typeof options.onChangeDueDate === 'function'){
                    displayElement.trigger('focus').val(displayDate).trigger('blur');
                    options.onChangeDueDate(displayDate);
                    if ($sel) $sel.slideUp(250);
                } else {
                    displayElement.val(displayDate);
                    $.event.trigger({ type: "hiddenValChg", input: displayElement});
                }
            }
        }

	function getFullUTCDate(date) {
		var UTCYear = date.getUTCFullYear();
		var UTCMonth = date.getUTCMonth();
		var UTCDate = date.getUTCDate();
		var UTCHours = date.getUTCHours();
		var UTCMinutes = date.getUTCMinutes();
		var UTCSeconds = date.getUTCSeconds();
		var UTCMilliseconds = date.getUTCMilliseconds();

		return $.datepicker.formatDate("yy-mm-dd", new Date(UTCYear, UTCMonth, UTCDate, UTCHours, UTCMinutes, UTCSeconds, UTCMilliseconds));
	}

        var $sel = (options.inlineContainer) ? $(options.inlineContainer).addClass('ff_module-date-picker-calendar ff_module-date-picker-calendar--inline') : $(element);

        $sel.datepicker({
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
                $(inst.dpDiv).addClass('ff_module-date-picker-calendar ff_module-date-picker-calendar--popup');
                setTimeout(function () {
                    var curr_left = inst.dpDiv.css('left');
                    var curr_right = inst.dpDiv.css('right');
                    var curr_top = inst.dpDiv.css('top');

                    var new_left = 50 + parseInt(curr_left);
                    var new_right = 50 + parseInt(curr_right);
                    var new_top = parseInt(curr_top) - 40;

                    if(curr_left != 'auto') {inst.dpDiv.css({'left': new_left, 'top': new_top, 'z-index': 2000});}
                    if(curr_right != 'auto') {inst.dpDiv.css({'right': new_right, 'top': new_top, 'z-index': 2000});}

                    ensureElementIsFullyContainedByWindow(inst.dpDiv);
                }, 0);

                $(element).closest('['+options.containerSelector+']').addClass(options.containerActiveClass);
            },
            onClose: function(input, inst) {
                $(element).closest('['+options.containerSelector+']').removeClass(options.containerActiveClass);
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
