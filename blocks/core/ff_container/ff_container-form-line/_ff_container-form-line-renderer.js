'use strict';
var React = require('react');

var FormLabel = require('./ff_container-form-line');

var data = {
	formLine: [{
		content: React.createElement('span', {className: 'crate_util-block ff_container-form-line__item'}, ' Line label'),
	}, 
	{
		content: React.createElement('span', {className: 'crate_util-block ff_container-form-line__item  ff_container-form-line__item--fullwidth'}, ' Line Input'),
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		React.render(React.createElement(FormLabel, data), document.querySelector('[data-ff_container-form-line]'));
	});
};
