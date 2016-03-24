'use strict';
var React = require('react');

var FormLine = require('./ff_container-form-line');

var data = {
	formLine: [{
		content: <span className={ 'crate_util-block ff_container-form-line__item' }>Line label</span>
	},
	{
		content: <span className={ 'crate_util-block ff_container-form-line__item' }>Line input</span>
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_container-form-line]');
        if (element) {
		  React.render(React.createElement(FormLine, data), element);
        }
	});
};
