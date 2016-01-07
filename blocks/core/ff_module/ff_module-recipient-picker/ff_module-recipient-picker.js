'use strict';

var getView = require('./_ff_module-recipient-picker-view.js');
var rt = require('./_ff_module-recipient-picker.rt.js');

module.exports = function(recipientPickerControl, recipientPickerTemplate) {
    var recipientPickerView = getView();
    recipientPickerTemplate = recipientPickerTemplate || rt;

    var recipientPicker = recipientPickerView.createPeoplePicker(recipientPickerControl, recipientPickerTemplate);

    return recipientPicker;
};
