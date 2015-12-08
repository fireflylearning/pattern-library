'use strict';
var React = require('react');

require('../ff_module/ff_module-button/ff_module-button')();
require('../ff_module/ff_module-filter/ff_module-filter')();
require('../ff_module/ff_module-tabs-navigation/ff_module-tabs-navigation')();

// var editFac = require('../ff_module/ff_module-inline-edit/stubControl.js');
// require('../ff_module/ff_module-inline-edit/ff_module-inline-edit')(editFac);

var helpFac = require('../ff_module/ff_module-inline-help/stubControl.js');
require('../ff_module/ff_module-inline-help/ff_module-inline-help')(helpFac);

var PeoplePicker = require('../ff_module/ff_module-recipient-picker/ff_module-recipient-picker');

var peoplePickerControl = require('../ff_module/ff_module-recipient-picker/ff_module-recipient-picker.control.js')();
var peoplePicker = PeoplePicker.createPeoplePicker(peoplePickerControl);
React.render(React.createElement(peoplePicker), document.getElementById('container'));
