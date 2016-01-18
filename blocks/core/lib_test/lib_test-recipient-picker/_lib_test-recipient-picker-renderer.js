'use strict';

var React = require('react');
var $ = require('jquery');

var recipientPickerService = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker-component/_ff_module-recipient-picker-component-mockservice')();
var recipientPickerComponent = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker-component/ff_module-recipient-picker-component')(recipientPickerService);

var groupButtonService = require('../../ff_module/ff_module-recipient-picker-new-group-button/_ff_module-recipient-picker-new-group-button-mockservice.js')();
var createNewGroupButton = require('../../ff_module/ff_module-recipient-picker-new-group-button/ff_module-recipient-picker-new-group-button.js');

var groupListService = require('../../ff_module/ff_module-recipient-button-list/ff_module-recipient-button-list-component/_ff_module-recipient-button-list-component-mockservice')();
var createRecipientListComponent = require('../../ff_module/ff_module-recipient-button-list/ff_module-recipient-button-list-component/ff_module-recipient-button-list-component-with-picker');

module.exports = function() {
    var picker;

    document.addEventListener('DOMContentLoaded', function(event) {
        console.log('tab-recipients');
        var pickerEl = document.querySelector('[data-ff-recipient-picker-test]'); //Use jquery or sim in Firefly for backwards compat
        if (pickerEl) {
            picker = React.render(React.createElement(recipientPickerComponent), pickerEl);
        }
        var btnEl = document.querySelector('[data-ff-recipient-picker-new-group-button-test]');
        if (btnEl && picker){
            var newGroupButtonComponent = createNewGroupButton(picker, groupButtonService);
            var newGroupButton = React.render(React.createElement(newGroupButtonComponent), btnEl);
        }
        $('[data-ff-recipient-list-type]').each(function(i){

            var $el = $(this);
            var type = $el.attr('data-ff-recipient-list-type');
            var newRecipientListComponent = createRecipientListComponent(picker, groupListService, type);
            var newRecipientList = window['recipientList' + i] = React.render(React.createElement(newRecipientListComponent), $el.get(0));
        });

    });

};
