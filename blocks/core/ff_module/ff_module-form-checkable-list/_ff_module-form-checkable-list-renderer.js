'use strict';
var React = require('react');

var CheckableList = require('./ff_module-form-checkable-list'),
    selector = 'data-ff-crate-block-react-item';

function createHeading(domElement) {
    let title = document.createTextNode('React Component'),
        heading = document.createElement('h1');
    heading.appendChild(title);
    domElement.insertBefore(heading, domElement.childNodes[0])
}

var data = {
    modifier:'stacked',
	items: [{
		label: 'Label text',
		required: true,
		modifier: 'inline',
		type: 'checkbox',
		id: 'react-radio-id-1',
		value: 'radio-value-1',
		name: 'react-radio-list-group',
		key: 1
	},
	{	label: 'Label text',
		required: true,
		type: 'checkbox',
		modifier: 'inline',
		id: 'react-radio-id-2',
		value: 'radio-value-2',
		checked: true,
		name: 'react-radio-list-group',
		key: 2
	},
	{
		label: 'Label text',
		required: true,
		type: 'checkbox',
		modifier: 'inline',
		id: 'react-radio-id-3',
		value: 'radio-value-3',
		name: 'react-radio-list-group',
		key: 3
	}]
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff-crate-block-react-item]');
        if (element) {
            React.render(<CheckableList {...data} />, element);
            createHeading(element);
        }
	});
};
