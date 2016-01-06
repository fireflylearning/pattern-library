'use strict';

var createRecipientPicker = require('./_ff_module-recipient-picker-view.js');
var rt = require('./_ff_module-recipient-picker.rt.js');

module.exports = function(service, template) {

    var recipientPicker = createRecipientPicker(service, (template || rt));

    return recipientPicker;
};
