'use strict';
var React = require('react');

var FormLabel = require('./ff_module-form-label');

var data = {
	id: 'my-id',
	required: false,
	data: [{
		attr: 'data-ff-attr',
		value: true
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		React.render(React.createElement(FormLabel, data, 'Stacked text input name'), document.querySelector('[data-ff_module-form-label]'));
	});
};
