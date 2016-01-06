'use strict';
var React = require('react');

var recipientPickerService = require('../ff_module-recipient-picker/_ff_module-recipient-picker-service.js')();
var recipientPickerComponent = require('../ff_module-recipient-picker/ff_module-recipient-picker')(recipientPickerService);

var groupService = require('./_ff_module-recipient-picker-new-group-button-service.js')();
var createNewGroupButton = require('./ff_module-recipient-picker-new-group-button.js');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var picker,
        pickerEl = document.querySelector('[data-ff-recipient-picker-ng]'); //Use jquery or sim in Firefly for backwards compat
        if (pickerEl) {
            picker = React.render(React.createElement(recipientPickerComponent), pickerEl);
        }
        var btnEl = document.querySelector('[data-ff-recipient-picker-new-group-button]');
        if (btnEl && picker){
            var newGroupButtonComponent = createNewGroupButton(picker, groupService);
            var newGroupButton = React.render(React.createElement(newGroupButtonComponent), btnEl);
        }
    });
};
