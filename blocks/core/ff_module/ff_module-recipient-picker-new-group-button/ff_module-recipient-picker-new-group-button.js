'use strict';

var createNewGroupButton = require('./_ff_module-recipient-picker-new-group-button-viewcontrol.js');
var rt = require('./_ff_module-recipient-picker-new-group-button.rt.js');

module.exports = function(recipientPicker, groupService, template) {
    if (!recipientPicker) throw new Error('[new-group-button] requires a \'recipientPicker\' reference');
    if (!groupService) throw new Error('[new-group-button] requires a \'groupService\' parameter');

    template = template || rt;

    var recipientNewGroupButtonPicker = createNewGroupButton(recipientPicker, groupService, template);

    return recipientNewGroupButtonPicker;
};
