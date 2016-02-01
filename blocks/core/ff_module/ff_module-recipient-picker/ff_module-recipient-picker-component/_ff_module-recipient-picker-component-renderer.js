'use strict';
var React = require('react');

var recipientPickerService = require('./_ff_module-recipient-picker-component-mockservice.js')();
var recipientPicker = require('./ff_module-recipient-picker-component')(recipientPickerService);

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff-recipient-picker]'); //Use jquery or sim in Firefly for backwards compat
        // var el = document.getElementById('recipient-picker-container');
        if (el) {
            var picker = React.render(React.createElement(recipientPicker), el);
            // picker.getSelectedRecipients();
        }
    });
};
