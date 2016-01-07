'use strict';

var createRecipientPicker = require('./_ff_module-recipient-picker-component-viewcontrol.js');
var rt = require('./_ff_module-recipient-picker-component.rt.js');

module.exports = function(service, template) {

    var recipientPicker = createRecipientPicker(service, (template || rt));

    return recipientPicker;
};
