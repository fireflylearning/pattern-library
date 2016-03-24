'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var mockPicker = require('../../ff_module-recipient-picker-component/_ff_module-recipient-picker-component-mockcomponent')();
var mockGroupListService = require('./_ff_module-recipient-button-list-component-mockservice')();
var createRecipientListComponent = require('./ff_module-recipient-button-list-component-with-picker');

module.exports = function() {

    document.addEventListener('DOMContentLoaded', function(event) {

        console.log('picker group list');
        var el = document.querySelector('[data-ff-button-list-test]');

        if (el) {
            var type = el.getAttribute('data-ff-button-list-test') || 'all-groups';
            var newRecipientListComponent = createRecipientListComponent(mockPicker, mockGroupListService, type);
            var newRecipientList = ReactDOM.render(React.createElement(newRecipientListComponent), el);
        }

    });

};
