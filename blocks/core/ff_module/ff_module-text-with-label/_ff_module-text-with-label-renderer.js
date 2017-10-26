'use strict';
var React = require('react'),
	ReactDOM = require('react-dom'),
	selector = 'data-ff-crate-block-react-item';

import TextWithLabel from './ff_module-text-with-label';
var createHeading = require("../../_lib/ff-core/_ff-core.js").createHeading;

var props = {
	label: "Set By",
	text: "Terry Teacher"
}

module.exports = function() {

	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
			if (domElement) {
				ReactDOM.render(React.createElement(TextWithLabel, props), domElement);
				createHeading(domElement);
			}
		});
	}); 
};  