'use strict';
var React = require('react');

var FilterContainer = require('./ff_container-filter');

var data = {
	label: 'Sort by',
	modifier: 'fixed-height',
	clearFiltersButton: {
		text: 'Clear All',
		id: 'btn-01',
		modifier: 'link'
	},
	filters: [{
		key: 1,
		content: <span className={'crate_util-block'}>Module A</span>
	},
	{
		key: 2,
		content: <span className={'crate_util-block'}>Module B</span>
	},
	{
		key: 3,
		content: <span className={'crate_util-block'}>Module C</span>
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_container-filter]');
        if (element) {
            React.render(React.createElement(FilterContainer, data), element);
        }
	});
};
