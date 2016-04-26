'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabsNavigation = require('./ff_module-tabs-navigation-component');

var data = {
	modifier: '',
	tabs: [{
		state: 'is-active',
		label: "Overview",
		id: "tab1-react",
		key: 1
	},
	{
		state: '',
		label: "Details",
		id: "tab2-react",
		key: 2
	},
	{
		state: '',
		label: "Tasks",
		id: "tab3-react",
		key: 3
	},
	{
		state: '',
		label: "Students",
		id: "tab4-react",
		key: 4
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-tabs-navigation]'), function(element) {
			if (element) {
				ReactDOM.render(<TabsNavigation {...data} />, element);
			}
		});
	});
};