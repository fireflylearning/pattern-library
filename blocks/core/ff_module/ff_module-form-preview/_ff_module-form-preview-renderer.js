'use strict';

var ReactDOM = require('react-dom');

var FormPreview = require('./ff_module-form-preview');

var data = {
	items: [{
		modifier: 'progress',
		title: 'Progress',
		progress: {
			id: 1,
			classes: "ff_module-other-module-class ff_utils-other-class",
			sentTo: 23,
			numExcused: 2,
			completedBy: 20,
			marked: 3
		},
		key: 0
	},
	{
		modifier: 'controls',
		title: 'My component',
		component: <span className='crate_util-block'>My component</span>,
		key: 1
	},
	{
		title: 'Details',
		url: '',
		list: [{
			title: "Title:",
			value: "Unit Test 3",
			previewfor: "input[name='title']",
			key: 3
		},
		{
			title: "Due Date:",
			value: "2016-07-06T14:13:43Z",
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
		title: 'Task Files',
		fileList: {
			files: [{
				title: 'My lovely file.pdf',
				href: '#'
			}, {
				type: 'page',
				title: 'My lovely page',
				href: '#'
			}]
		},
		key: 3

	},
	{
		modifier: 'description',
		title: 'Description',
		html: '<div><h2>Volcano formation</h2> <p>Volcanoes are amazing</p></div>',
		key: 4
	},
    {
        title: 'Test',
        value: (new Date()).toString()
    }]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_module-form-preview]');
		if (element) {
			ReactDOM.render(<FormPreview {...data}/>, element);
		}
	});
};
