'use strict';
var React = require('react'),
	ReactDOM = require('react-dom'),
	selector = 'data-ff-crate-block-react-item';

import DateStepper from './ff_module-date-stepper';
var createHeading = require("../../_lib/ff-core/_ff-core.js").createHeading;

var props = {
	niceDate: "Today",
	date: "21 Jun",
	nextUrl: "/",
	prevUrl: "/"
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
			if (domElement) {
				ReactDOM.render(React.createElement(DateStepper, props), domElement);
				createHeading(domElement);
			}
		});
	}); 
};  