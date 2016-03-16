'use strict';
var React = require('react');

var Expandable = require('./ff_container-expandable-component');

var data = {
	expdanded_text: 'Hide content',
	collapsed_text: 'Show content',
	collapsed_icon: 'ff_icon-page-down-open-blue',
	expanded_icon: 'ff_icon-page-up-open-blue',
	content: <span className='crate_util-block'>Content</span>
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		React.render(<Expandable {...data}/>, document.querySelector('[data-ff_container-expandable-component]'));
	});
};
