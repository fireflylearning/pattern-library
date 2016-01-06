'use strict';

var createRecipientList = require('./_ff_module-recipient-button-list-view.js');
var rt = require('./_ff_module-recipient-button-list.rt.js');

module.exports = function(service, template) {

    var recipientPicker = createRecipientList(service, (template || rt));

    return recipientPicker;
};
