'use strict';
var ReactDOM = require('react-dom');

var recipientPickerService = require('./_ff_module-recipient-picker-component-mockservice.js')();
var RecipientPicker = require('./ff_module-recipient-picker-component')(recipientPickerService);

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-recipient-picker-component]'); //Use jquery or sim in Firefly for backwards compat
        // var el = document.getElementById('recipient-picker-container');
        if (el) {
            ReactDOM.render(<RecipientPicker noFocusOnLoad={true} />, el);
        }
    });
};
