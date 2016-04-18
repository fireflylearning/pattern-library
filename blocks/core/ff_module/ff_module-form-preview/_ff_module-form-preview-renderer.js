'use strict';
var React = require('react');

var FormPreview = require('./ff_module-form-preview');
var MarkingControls = require('../ff_module-form-marking-controls/ff_module-form-marking-controls');

var data = {
	items: [{
		modifier: 'progress',
		title: 'Progress', 
		progress: {
			id: 1,
			classes: "ff_module-other-module-class ff_utils-other-class",
			sent_to: 23,
			no_excused: 2,
			completed_by: 20,
			marked: 3
		},
	},
	{	
		modifier: 'controls',
		title: 'My component', 
		component: <span className='crate_util-block'>My component</span>
	},
	{
		title: 'Details',
		url: '',
		list: [{
			title: "Title:",
			value: "Volcano formation",
			previewfor: "input[name='title']",
			key: 3
		},
		{
			title: "Due Date:",
			value: "16/05/2016",
			key: 4
		},
		{
			title: 'Recipients:',
			url: 'test',
			value: 'Class 2, Class 1',
			previewfor: 'input[name="recipients"]',
			key: 5
		},
		{
			title: "Set By:",
			value: "Terry Teacher",
			key: 6
		},
		{
			title: "Include in Markbook:",
			value: "Yes",
			key: 7
		}],
		key: 2
	},
	{
		modifier: 'description',
		title: 'Description',
		html: <div><h2>Volcano formation</h2> <p>Volcanoes form when magma reaches the Earth's surface, causing eruptions of lava and ash. They occur at destructive (compressional) and constructive (tensional) plate boundaries.</p></div>
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_module-form-preview]');
		if (element) {
			React.render(<FormPreview {...data}/>, element);
		}
	});
};
