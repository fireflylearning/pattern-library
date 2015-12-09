'use strict';
var React = require('react');

var recipientPickerControl = require('./_ff_module-recipient-picker-control.js')();
var recipientPicker = require('./ff_module-recipient-picker')(recipientPickerControl);

module.exports = function(){
    React.render(React.createElement(recipientPicker), document.getElementById('recipient-picker-container'));
};
