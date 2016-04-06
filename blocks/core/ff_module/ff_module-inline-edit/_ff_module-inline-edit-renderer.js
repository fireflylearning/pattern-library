'use strict';
var React = require('react');

var InlineEdit = require('./ff_module-inline-edit');

var data = {
	text: 'Edit',
	id: 'edit-id-1',
	url: '#edit-url',
	modifier: ''
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_module-inline-edit]');
		if (element) {
			React.render(<InlineEdit {...data} />, element);
		}
	});
};
