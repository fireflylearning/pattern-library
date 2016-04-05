'use strict';
var React = require('react');

var FormPreview = require('./ff_module-form-preview');

var data = {
	items: [{
		title: 'Recipients',
		url: '',
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
		title: 'Description',
		html: <div><h2>Volcano formation</h2> <p>Volcanoes form when magma reaches the Earth's surface, causing eruptions of lava and ash. They occur at destructive (compressional) and constructive (tensional) plate boundaries.</p></div>
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_module-form-preview]');
		if (element) {
			React.render(<FormPreview {...data} />, element);
		}
	});
};
