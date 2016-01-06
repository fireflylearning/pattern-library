'use strict';

var React = require('react');
var $ = require('jquery');

var recipientPickerService = require('../../ff_module/ff_module-recipient-picker/_ff_module-recipient-picker-service.js')();
var recipientPickerComponent = require('../../ff_module/ff_module-recipient-picker/ff_module-recipient-picker')(recipientPickerService);

var groupService = require('../../ff_module/ff_module-recipient-picker-new-group-button/_ff_module-recipient-picker-new-group-button-service.js')();
var createNewGroupButton = require('../../ff_module/ff_module-recipient-picker-new-group-button/ff_module-recipient-picker-new-group-button.js');

var groupListService = require('./_lib_test-tabs-recipients-mockservice')();
var createRecipientListComponent = require('./lib_test-tabs-recipients');

module.exports = function() {
    var picker;

    document.addEventListener('DOMContentLoaded', function(event) {
        console.log('tab-recipients');
        var pickerEl = document.querySelector('[data-ff-recipient-picker-tabs]'); //Use jquery or sim in Firefly for backwards compat
        if (pickerEl) {
            picker = React.render(React.createElement(recipientPickerComponent), pickerEl);
        }
        var btnEl = document.querySelector('[data-ff-recipient-picker-new-group-button-tabs]');
        if (btnEl && picker){
            var newGroupButtonComponent = createNewGroupButton(picker, groupService);
            var newGroupButton = React.render(React.createElement(newGroupButtonComponent), btnEl);
        }
        $('[data-ff-recipient-list-type]').each(function(){

            var $el = $(this);
            var type = $el.attr('data-ff-recipient-list-type');
            var newRecipientListComponent = createRecipientListComponent(picker, groupListService, type);
            var newRecipientList = React.render(React.createElement(newRecipientListComponent), $el.get(0));
        });

    });

};
