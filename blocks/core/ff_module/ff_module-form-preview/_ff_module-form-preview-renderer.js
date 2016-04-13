'use strict';
var React = require('react');

var FormPreview = require('./ff_module-form-preview');
var MarkingControls = require('../ff_module-form-marking-controls/ff_module-form-marking-controls');

var controlsProps = {
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
				id: 'react-radio-id-2',
				value: 'radio-value-2',
				name: 'react-radio-list-group',
				key: 2
			}]
		}
	}
}

var data = {
	items: [{
		title: 'Recipients',
		url: 'test',
		value: 'Class 2, Class 1',
		previewfor: 'input[name="recipients"]',
		key: 1
	},
	{
		title: 'Details',
		url: '',
		list: [{
			title: "Title",
			value: "Volcano formation",
			previewfor: "input[name='title']",
			key: 3
		},
		{
			title: "Due Date",
			value: "16/05/2016",
			key: 4
		}],
		key: 2
	},
	{
		title: 'Progress', 
		progress: {
			id: 1,
			classes: "ff_module-other-module-class ff_utils-other-class",
			sent_to: 23,
			no_excused: 2,
			completed_by: 20,
			marked: 3
		},
		markingControls: true	
	},
	{
		title: 'Description',
		html: <div><h2>Volcano formation</h2> <p>Volcanoes form when magma reaches the Earth's surface, causing eruptions of lava and ash. They occur at destructive (compressional) and constructive (tensional) plate boundaries.</p></div>
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_module-form-preview]');
		if (element) {
			React.render(<FormPreview {...data} controls={<MarkingControls {...controlsProps}/>}/>, element);
		}
	});
};
