'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');
var $ = require('jquery');

var recipientPickerService = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker-component/_ff_module-recipient-picker-component-mockservice')();
var RecipientPickerComponent = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker-component/ff_module-recipient-picker-component')(recipientPickerService);

var groupButtonService = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker-new-group-button/_ff_module-recipient-picker-new-group-button-mockservice.js')();
var createNewGroupButton = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker-new-group-button/ff_module-recipient-picker-new-group-button.js');

var groupListService = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-button-list/ff_module-recipient-button-list-component/_ff_module-recipient-button-list-component-mockservice')();
var createRecipientListComponent = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-button-list/ff_module-recipient-button-list-component/ff_module-recipient-button-list-component-with-picker');

require('../../ff_module/ff_module-tabs/_ff_module-tabs-renderer')();

module.exports = function() {
    var picker;

    document.addEventListener('DOMContentLoaded', function(event) {
        console.log('tab-recipients');
        var pickerEl = document.querySelector('[data-ff-recipient-picker-test]'); //Use jquery or sim in Firefly for backwards compat
        if (pickerEl) {
            picker = ReactDOM.render(React.createElement(RecipientPickerComponent), pickerEl);
        }
        var btnEl = document.querySelector('[data-ff-recipient-picker-new-group-button-test]');
        if (btnEl && picker) {
            var GroupButtonComponent = createNewGroupButton(picker, groupButtonService);
            ReactDOM.render(React.createElement(GroupButtonComponent), btnEl);
        }
        $('[data-ff-recipient-list-type]').each(function(i) {

            var $el = $(this);
            var type = $el.attr('data-ff-recipient-list-type');
            var RecipientListComponent = createRecipientListComponent(picker, groupListService, type);
            window['recipientList' + i] = ReactDOM.render(React.createElement(RecipientListComponent), $el.get(0));
        });

    });

};
