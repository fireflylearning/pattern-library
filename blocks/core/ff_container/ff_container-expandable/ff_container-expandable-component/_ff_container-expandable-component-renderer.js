'use strict';
var React = require('react');

var Expandable = require('./ff_container-expandable-component');

var data = {
	expandedText: 'Hide content',
	collapsedText: 'Show content',
	collapsedIcon: 'ff_icon-page-down-open-blue',
	expandadeIcon: 'ff_icon-page-up-open-blue',
	content: <span className='crate_util-block'>Content</span>
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_container-expandable-component]'), function(domElement) {
			React.render(<Expandable {...data}/>, domElement);
		});
	});
};
