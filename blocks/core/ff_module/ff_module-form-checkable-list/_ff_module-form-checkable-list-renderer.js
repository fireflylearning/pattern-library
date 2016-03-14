'use strict';
var React = require('react');

var CheckableList = require('./ff_module-form-checkable-list');

var data = {
	modifier: 'inline',
	inputs: [{
		label: 'Radio item 1',
		type: 'radio',
		id: 'radio-id-1',
		value: 'radio-value-1',
		name: 'radio-list-group',
		checked: false
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		React.render(React.createElement(CheckableList, data), document.querySelector('[data-ff_module-form-checkable-list]'));
	});
};
