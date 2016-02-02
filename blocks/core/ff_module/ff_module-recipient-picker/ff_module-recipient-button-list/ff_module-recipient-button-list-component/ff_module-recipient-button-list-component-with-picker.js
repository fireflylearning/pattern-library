'use strict';

var createRecipientList = require('./_ff_module-recipient-button-list-component-viewcontrol.js');
var rt = require('./_ff_module-recipient-button-list-component-with-picker.rt.js');

module.exports = function(recipientPicker, groupService, groupType, template) {
    if (!recipientPicker) throw new Error('[recipient-list] requires a \'recipientPicker\' reference');
    if (!groupService) throw new Error('[recipient-list] requires a \'groupService\' parameter');
    if (!groupType) throw new Error('[recipient-list] requires a \'groupType\' parameter');

    template = template || rt;

    var recipientList = createRecipientList(recipientPicker, groupService, groupType, template);

    return recipientList;
};
