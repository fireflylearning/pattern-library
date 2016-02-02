'use strict';
var React = require('react');

var groupService = require('./_ff_module-recipient-picker-new-group-button-mockservice')();
var createNewGroupButton = require('./ff_module-recipient-picker-new-group-button');

var getfakePicker = require('../ff_module-recipient-picker-component/_ff_module-recipient-picker-component-mockcomponent');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {

        var picker = getfakePicker();

        var btnEl = document.querySelector('[data-ff-recipient-picker-new-group-button]');
        if (btnEl && picker) {
            var newGroupButtonComponent = createNewGroupButton(picker, groupService);
            var newGroupButton = React.render(React.createElement(newGroupButtonComponent), btnEl);
        }
    });
};
