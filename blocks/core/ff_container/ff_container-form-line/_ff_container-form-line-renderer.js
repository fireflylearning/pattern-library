'use strict';
var React = require('react');

var FormLabel = require('./ff_container-form-line');

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
		React.render(React.createElement(FormLabel, data), document.querySelector('[data-ff_container-form-line]'));
	});
};
