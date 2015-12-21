'use strict';
var React = require('react');

var $ = require('jquery');

var recipientPickerControl = require('./_ff_module-recipient-picker-control.js')();
var recipientPicker = require('./ff_module-recipient-picker')(recipientPickerControl);

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.getElementById('recipient-picker-container');
        if (el) {
            React.render(React.createElement(recipientPicker), el);
        }
    });


};
