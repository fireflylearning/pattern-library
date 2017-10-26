'use strict';
var React = require('react'),
	ReactDOM = require('react-dom'),
	selector = 'data-ff-crate-block-react-item';

import EmptyState from './ff_module-empty-state';
var createHeading = require("../../_lib/ff-core/_ff-core.js").createHeading;

var props = {
	image: <span className="crate_util-block">My Image</span>,
	headline: "There are no posts, comments or edits to see",
	explanation: "None of the pages you follow have been commented on or updated yet",
	callToAction: <span className="crate_util-block">My Action</span>
}

module.exports = function() {

	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
			if (domElement) {
				ReactDOM.render(React.createElement(EmptyState, props), domElement);
				createHeading(domElement);
			}
		});
	}); 
};  