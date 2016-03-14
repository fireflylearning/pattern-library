'use strict';
var React = require('react');

var FilterContainer = require('./ff_container-filter');

var data = {
	label: 'Sort by',
	modifier: 'fixed-height',
	filters: [{
		content: <span className={'crate_util-block'}>Module A</span>
	},
	{
		content: <span className={'crate_util-block'}>Module B</span>
	},
	{
		content: <span className={'crate_util-block'}>Module C</span>	
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		React.render(React.createElement(FilterContainer, data), document.querySelector('[data-ff_container-filter]'));
	});
};
