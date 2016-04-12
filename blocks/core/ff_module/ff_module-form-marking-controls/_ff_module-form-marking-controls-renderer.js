'use strict';
var React = require('react');

var MarkingControls = require('./ff_module-form-marking-controls');

var data = {
	modifier: '',
	controls: {
		buttons: [{
			text:'Send Reminder',
			id: 1,
			key: 1
		},
		{
			text: 'Mark Now',
			id: 2,
			key: 2
		},
		{
			text: 'Release Marks',
			id: 3,
			key: 3
		}],
		checkableList: {
			modifier: 'stacked',
			items: [{
				label: 'Label text',
				required: true,
				type: 'radio',
				id: 'react-radio-id-1',
				value: 'radio-value-1',
				name: 'react-radio-list-group',
				key: 1
			},
			{
				label: 'Label text',
				required: true,
				type: 'radio',
				id: 'react-radio-id-1',
				value: 'radio-value-1',
				name: 'react-radio-list-group',
				key: 2
			}]
		}
	}
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_module-form-marking-controls]');

		if (element) {
			React.render(<MarkingControls {...data}/>, element);
		}
	});
};
